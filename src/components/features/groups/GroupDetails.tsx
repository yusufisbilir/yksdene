'use client'

import {
  useGetGroupByIdQuery,
  useGetGroupMembersQuery,
  useLeaveGroupMutation,
} from '@/features/group.slice'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams, useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'
import {
  AlertCircle,
  Users,
  Lock,
  UnlockIcon,
  Trophy,
  LogOut,
  CalendarDays,
  Hash,
  User,
  Copy,
  CheckCheck,
} from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export default function GroupDetails() {
  const { id } = useParams()

  if (!id || typeof id !== 'string') {
    return <div>Grup ID bulunamadı</div>
  }

  const router = useRouter()
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { data: group, isLoading: groupLoading, error: groupError } = useGetGroupByIdQuery(id)
  const { data: members, isLoading: membersLoading } = useGetGroupMembersQuery(id)
  const [leaveGroup, { isLoading: isLeaving }] = useLeaveGroupMutation()

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(id).unwrap()
      toast.success('Gruptan başarıyla ayrıldınız')
      router.push(ROUTES.GROUPS)
    } catch (error) {
      console.error('Gruptan ayrılma hatası:', error)
      toast.error('Gruptan ayrılırken bir hata oluştu')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (groupLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/3" />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (groupError || !group) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-medium mt-4">Grup bulunamadı</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Bu grup mevcut değil veya erişim izniniz yok
            </p>
            <Button asChild className="mt-6">
              <Link href={ROUTES.GROUPS}>Gruplara Dön</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <Hash className="h-4 w-4 mr-1" />
            <span className="text-sm">ID: {group.id}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <LogOut className="w-4 h-4 mr-1.5" />
                Ayrıl
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gruptan ayrılmak istediğinize emin misiniz?</DialogTitle>
                <DialogDescription>
                  Bu işlem geri alınamaz. Eğer gruba tekrar katılmak isterseniz, grup ID ve katılım
                  koduna ihtiyacınız olacak.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>
                  İptal
                </Button>
                <Button variant="destructive" onClick={handleLeaveGroup} disabled={isLeaving}>
                  {isLeaving ? 'Ayrılıyor...' : 'Gruptan Ayrıl'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <CardTitle className="text-xl">Grup Bilgileri</CardTitle>
                    {group.is_public ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                      >
                        <UnlockIcon className="w-3 h-3 mr-1" /> Açık Grup
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800"
                      >
                        <Lock className="w-3 h-3 mr-1" /> Özel Grup
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center">
                    <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(group.created_at).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <p className="whitespace-pre-line">
                  {group.description || 'Bu grup için açıklama bulunmuyor.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center p-3 rounded-md border">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Oluşturan</p>
                    <p className="font-medium">{group.created_by.substring(0, 10)}...</p>
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-md border">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Üye Sayısı</p>
                    <p className="font-medium">{members?.length || 0} üye</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t py-3 flex gap-3 flex-wrap">
              <div className="flex items-center justify-between space-x-2 px-3 py-2 rounded-md bg-muted/50 w-full">
                <div className="flex items-center">
                  <div className="font-medium text-sm mr-2">Grup ID:</div>
                  <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">{group.id}</code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => copyToClipboard(group.id)}
                >
                  {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              {!group.is_public && group.join_code && (
                <div className="flex items-center justify-between space-x-2 px-3 py-2 rounded-md bg-muted/50 w-full">
                  <div className="flex items-center">
                    <div className="font-medium text-sm mr-2">Katılım Kodu:</div>
                    <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">
                      {group.join_code}
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => group.join_code && copyToClipboard(group.join_code)}
                  >
                    {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Grup Üyeleri</CardTitle>
              <CardDescription>{members?.length || 0} üye</CardDescription>
            </CardHeader>
            <CardContent>
              {membersLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-3.5 w-[120px]" />
                        <Skeleton className="h-3 w-[80px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !members || members.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">Bu grupta henüz üye bulunmuyor</p>
                </div>
              ) : (
                <div className="space-y-3 pr-1 max-h-[350px] overflow-y-auto">
                  {members?.map((member, index) => {
                    const memberWithProfile = member as any
                    const profile = memberWithProfile.profile || {}

                    return (
                      <div key={member.id}>
                        {index > 0 && <div className="border-t my-3" />}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={profile?.avatar_url || profile?.image_url}
                                alt={profile?.full_name || profile?.name || 'Üye'}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-orange-100 to-amber-100 text-amber-700">
                                {profile?.full_name || profile?.name
                                  ? (profile?.full_name || profile?.name)
                                      .split(' ')
                                      .map((n: string) => n[0])
                                      .join('')
                                  : '?'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium line-clamp-1">
                                {profile?.full_name || profile?.name || 'İsimsiz Kullanıcı'}
                              </p>
                              {member.role === 'admin' && (
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-200 mt-1"
                                >
                                  Admin
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
