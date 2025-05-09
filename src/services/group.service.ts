import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { Group, GroupLeaderboard, GroupMember, GroupInsert } from '@/types'
import { apiRequestValidator } from './requestValidator.service'

export const groupService = {
  async createGroup(
    name: string,
    description: string | null,
    isPublic: boolean,
    joinCode: string | null,
  ): Promise<Group> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Normalize group name to create a unique slug-like ID
      const groupId = name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      // Check if group ID already exists
      const { data: existingGroup } = await supabase
        .from('groups')
        .select('id')
        .eq('id', groupId)
        .single()

      if (existingGroup) {
        throw new Error('Bu grup adı zaten kullanılıyor. Lütfen farklı bir isim seçiniz.')
      }

      const { data, error } = await supabase
        .from('groups')
        .insert({
          id: groupId,
          name,
          description,
          is_public: isPublic,
          join_code: joinCode,
          created_by: userId,
        })
        .select()
        .single()

      if (error) {
        console.error('Grup oluşturma hatası:', error)
        throw new Error('Grup oluşturulurken hata oluştu: ' + error.message)
      }

      // Grup oluşturan kullanıcıyı admin olarak ekle
      const { error: memberError } = await supabase.from('group_members').insert({
        group_id: data.id,
        user_id: userId,
        role: 'admin',
      })

      if (memberError) {
        console.error('Grup üyesi ekleme hatası:', memberError)
        // Grup oluşturuldu ama üye eklenemedi, grubu silelim
        await supabase.from('groups').delete().eq('id', data.id)
        throw new Error('Grup üyeliği oluşturulurken hata oluştu')
      }

      return data
    })
  },

  async joinGroup(groupId: string, joinCode?: string): Promise<GroupMember> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Grubun bilgilerini kontrol et
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single()

      if (groupError) throw groupError
      if (!group) throw new Error('Grup bulunamadı')

      // Kullanıcı zaten grupta mı kontrol et
      const { data: existingMembership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .maybeSingle()

      if (membershipError) throw membershipError
      if (existingMembership) throw new Error('Zaten bu grubun üyesisiniz')

      // Grup özel ise join_code kontrol et
      if (!group.is_public) {
        if (!joinCode) throw new Error('Bu özel gruba katılmak için kod gerekli')
        if (group.join_code !== joinCode) throw new Error('Geçersiz katılım kodu')
      }

      // Kullanıcıyı gruba ekle
      const { data, error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: userId,
          role: 'member',
        })
        .select()
        .single()

      if (error) throw error
      return data
    })
  },

  async getMyGroups(): Promise<Group[]> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Önce kullanıcının üye olduğu grup ID'lerini al
      const { data: memberships, error: membershipError } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('user_id', userId)

      if (membershipError) throw membershipError

      if (!memberships || memberships.length === 0) {
        return []
      }

      // Bu grup ID'lerini kullanarak grupları al
      const groupIds = memberships.map((m) => m.group_id)

      const { data, error } = await supabase.from('groups').select('*').in('id', groupIds)

      if (error) throw error
      return data || []
    })
  },

  async getPublicGroups(): Promise<Group[]> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      const { data, error } = await supabase.from('groups').select('*').eq('is_public', true)

      if (error) throw error
      return data || []
    })
  },

  async getGroupById(groupId: string): Promise<Group> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Kullanıcının bu grupta olup olmadığını kontrol et
      const { data: membership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .maybeSingle()

      if (membershipError) throw membershipError

      // Grup bilgilerini getir
      const { data, error } = await supabase.from('groups').select('*').eq('id', groupId).single()

      if (error) throw error
      if (!data) throw new Error('Grup bulunamadı')

      // Eğer grup özel ise ve kullanıcı üye değilse erişimi reddet
      if (!data.is_public && !membership) {
        throw new Error('Bu gruba erişim izniniz yok')
      }

      return data
    })
  },

  async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Kullanıcının bu grupta olup olmadığını kontrol et
      const { data: membership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .maybeSingle()

      if (membershipError) throw membershipError
      if (!membership) throw new Error('Bu grubun üyesi değilsiniz')

      // Grup üyelerini getir
      const { data, error } = await supabase
        .from('group_members')
        .select('*, profile:profiles(id, name, username, image_url)')
        .eq('group_id', groupId)

      if (error) throw error
      return data || []
    })
  },

  async leaveGroup(groupId: string): Promise<void> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Kullanıcının rolünü ve grup bilgisini kontrol et
      const { data: membership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .maybeSingle()

      if (membershipError) throw membershipError
      if (!membership) throw new Error('Bu grubun üyesi değilsiniz')

      // Grup bilgisini al
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single()
      if (groupError) throw groupError
      if (!group) throw new Error('Grup bulunamadı')

      // Eğer ayrılan kişi oluşturucu ise grubu ve tüm üyelikleri sil
      if (group.created_by === userId) {
        // Tüm üyelikleri sil
        const { error: deleteMembersError } = await supabase
          .from('group_members')
          .delete()
          .eq('group_id', groupId)
        if (deleteMembersError) throw deleteMembersError
        // Grubu sil
        const { error: deleteGroupError } = await supabase.from('groups').delete().eq('id', groupId)
        if (deleteGroupError) throw deleteGroupError
        return
      }

      // Eğer admin ise başka admin var mı kontrol et
      if (membership.role === 'admin') {
        const { data: otherAdmins, error: adminCheckError } = await supabase
          .from('group_members')
          .select('*')
          .eq('group_id', groupId)
          .eq('role', 'admin')
          .neq('user_id', userId)

        if (adminCheckError) throw adminCheckError

        // Eğer başka admin yoksa grubu silme veya başka birine admin yetkisi verme ihtiyacı
        if (!otherAdmins || otherAdmins.length === 0) {
          // Grubu sil
          const { error: deleteGroupError } = await supabase
            .from('groups')
            .delete()
            .eq('id', groupId)

          if (deleteGroupError) throw deleteGroupError
          return
        }
      }

      // Üyelikten çık
      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', userId)

      if (error) throw error
    })
  },

  async getGroupLeaderboard(groupId: string): Promise<GroupLeaderboard[]> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Kullanıcının bu grupta olup olmadığını kontrol et
      const { data: membership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .maybeSingle()

      if (membershipError) throw membershipError
      if (!membership) throw new Error('Bu grubun üyesi değilsiniz')

      // Grup leaderboard'ını getir
      const { data, error } = await supabase
        .from('group_leaderboard_view')
        .select('*')
        .eq('group_id', groupId)
        .order('total_exam_attempts', { ascending: false })

      if (error) throw error
      return data || []
    })
  },

  async updateGroupRole(
    groupId: string,
    targetUserId: string,
    newRole: 'admin' | 'member',
  ): Promise<GroupMember> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Kullanıcının admin olup olmadığını kontrol et
      const { data: membership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle()

      if (membershipError) throw membershipError
      if (!membership) throw new Error('Bu grup için yönetici yetkiniz yok')

      // Hedef kullanıcının rolünü güncelle
      const { data, error } = await supabase
        .from('group_members')
        .update({ role: newRole })
        .eq('group_id', groupId)
        .eq('user_id', targetUserId)
        .select()
        .single()

      if (error) throw error
      return data
    })
  },

  async removeUserFromGroup(groupId: string, targetUserId: string): Promise<void> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Kullanıcının admin olup olmadığını kontrol et
      const { data: membership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle()

      if (membershipError) throw membershipError
      if (!membership) throw new Error('Bu grup için yönetici yetkiniz yok')

      // Kendini çıkaramazsın
      if (targetUserId === userId) {
        throw new Error('Kendinizi gruptan çıkaramazsınız. Çıkmak için grubu terk edin.')
      }

      // Kullanıcıyı gruptan çıkar
      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', targetUserId)

      if (error) throw error
    })
  },

  async updateGroup(groupId: string, groupData: Partial<GroupInsert>): Promise<Group> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Kullanıcının admin olup olmadığını kontrol et
      const { data: membership, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle()

      if (membershipError) throw membershipError
      if (!membership) throw new Error('Bu grup için yönetici yetkiniz yok')

      // Grubu güncelle
      const { data, error } = await supabase
        .from('groups')
        .update(groupData)
        .eq('id', groupId)
        .select()
        .single()

      if (error) throw error
      return data
    })
  },
}
