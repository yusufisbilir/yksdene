'use client'
import { useGetMyGroupsQuery, useGetPublicGroupsQuery } from '@/features/group.slice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Group } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Users, Lock, UnlockIcon, Plus, Trophy, User, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function GroupList() {
  const { data: myGroups, isLoading: myGroupsLoading } = useGetMyGroupsQuery()
  const { data: publicGroups, isLoading: publicGroupsLoading } = useGetPublicGroupsQuery()

  const isLoading = myGroupsLoading || publicGroupsLoading

  // Grupları birleştir, tekrar edenleri kaldır
  const allGroups = React.useMemo(() => {
    if (!myGroups && !publicGroups) return []
    const all = [...(myGroups || []), ...(publicGroups || [])]
    const uniq = all.filter((group, idx, arr) => arr.findIndex((g) => g.id === group.id) === idx)
    return uniq
  }, [myGroups, publicGroups])

  return (
    <div className="space-y-6">
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
      ) : allGroups.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-muted mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Henüz hiç grup bulunmuyor</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Yeni bir grup oluşturarak veya mevcut bir gruba katılarak arkadaşlarınızla birlikte
            çalışabilirsiniz.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild variant="outline">
              <Link href={ROUTES.GROUP_JOIN}>Gruba Katıl</Link>
            </Button>
            <Button asChild>
              <Link href={ROUTES.GROUP_CREATE}>Grup Oluştur</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  )
}

function GroupCard({ group, isPublic }: { group: Group; isPublic?: boolean }) {
  return (
    <Card className="overflow-hidden border border-border/40 hover:border-border/80 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-lg font-bold line-clamp-1 pr-20">{group.name}</CardTitle>
          {group.is_public ? (
            <Badge
              variant="outline"
              className="absolute top-4 right-6 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
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

        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <User className="w-3.5 h-3.5 mr-1" />
          <span>Oluşturan: {group.created_by.substring(0, 8)}...</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button asChild variant="outline" size="sm" className="h-9 w-full">
            <Link href={ROUTES.GROUP_DETAIL(group.id)}>
              <Users className="w-3.5 h-3.5 mr-1.5" /> Detaylar
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className={cn(
              'h-9 w-full',
              'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
            )}
          >
            <Link href={ROUTES.GROUP_LEADERBOARD(group.id)}>
              <Trophy className="w-3.5 h-3.5 mr-1.5" /> Sıralama
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
