'use client'

import {
  useGetMyGroupsQuery,
  useGetPublicGroupsQuery,
  useJoinGroupMutation,
} from '@/features/group.slice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Group } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Users, Lock, UnlockIcon, Plus, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function GroupList() {
  const { data: myGroups, isLoading: myGroupsLoading } = useGetMyGroupsQuery()
  const { data: publicGroups, isLoading: publicGroupsLoading } = useGetPublicGroupsQuery()

  const isLoading = myGroupsLoading || publicGroupsLoading

  const myGroupIds = React.useMemo(() => (myGroups ? myGroups.map((g) => g.id) : []), [myGroups])
  const notJoinedPublicGroups = React.useMemo(
    () => (publicGroups || []).filter((g) => !myGroupIds.includes(g.id)),
    [publicGroups, myGroupIds],
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Gruplar</h1>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="h-9">
            <Link href={ROUTES.GROUP_JOIN} className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Gruba Katıl
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-9 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            <Link href={ROUTES.GROUP_CREATE} className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Grup Oluştur
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="overflow-hidden border border-border/40 hover:border-border/80 transition-all duration-200"
            >
              <CardHeader className="pb-2 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-semibold mb-4">Gruplarım</h2>
            {myGroups && myGroups.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myGroups.map((group) => (
                  <GroupCard key={group.id} group={group} isMine />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-8">
                Henüz bir gruba katılmadın.
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 mt-8">Katılmadığım Açık Gruplar</h2>
            {notJoinedPublicGroups && notJoinedPublicGroups.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {notJoinedPublicGroups.map((group) => (
                  <GroupCard key={group.id} group={group} isPublicOnly />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-8">Grup oluştur</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function GroupCard({
  group,
  isMine,
  isPublicOnly,
}: {
  group: Group
  isMine?: boolean
  isPublicOnly?: boolean
}) {
  const router = useRouter()
  const [joinGroup, { isLoading }] = useJoinGroupMutation()

  const handleJoin = async () => {
    try {
      await joinGroup({ groupId: group.id }).unwrap()
      toast.success('Gruba başarıyla katıldınız')
      router.push(ROUTES.GROUP_DETAIL(group.id))
    } catch (error) {
      toast.error('Gruba katılırken bir hata oluştu.')
    }
  }

  return (
    <Card
      className={cn(
        'overflow-hidden border border-border/40 hover:border-border/80 hover:shadow-md transition-all duration-200',
        isPublicOnly && 'bg-orange-50 border-orange-200',
      )}
    >
      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-lg font-bold line-clamp-1 pr-20">{group.name}</CardTitle>
          {group.is_public ? (
            <Badge
              variant="outline"
              className={cn(
                'absolute top-4 right-6',
                isPublicOnly
                  ? 'bg-orange-100 text-orange-700 border-orange-300'
                  : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800',
              )}
            >
              <UnlockIcon className="w-3 h-3 mr-1" /> Açık
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="absolute top-4 right-6 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800"
            >
              <Lock className="w-3 h-3 mr-1" /> Özel
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="w-3 h-3 mr-1" />
          {new Date(group.created_at).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <p className="text-sm mb-6 line-clamp-2 min-h-[40px]">
          {group.description || 'Açıklama yok'}
        </p>

        {isPublicOnly ? (
          <Button
            onClick={handleJoin}
            size="sm"
            className="h-9 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Katılınıyor...' : 'Gruba Katıl'}
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm" className="h-9 w-full">
            <Link href={ROUTES.GROUP_DETAIL(group.id)}>
              <Users className="w-3.5 h-3.5 mr-1.5" /> Detaylar
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
