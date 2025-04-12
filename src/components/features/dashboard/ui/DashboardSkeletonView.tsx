import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardSkeletonView() {
  return (
    <article className="px-2 space-y-6 sm:px-4 md:px-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">👑 Başarı Tablosu</h1>

      {/* YKS Ranking Change Cards Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="w-64 h-7" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-24" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* YKS Ranking Table Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="w-56 h-7" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-48" />
        </CardContent>
      </Card>

      {/* YKS Ranking Charts Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="h-7 w-60" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-72" />
        </CardContent>
      </Card>

      {/* Denemelerim Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="w-48 h-7" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-40" />
        </CardContent>
      </Card>

      {/* Ortalama Netler Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="h-7 w-52" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-24" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performans Takibi Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="w-56 h-7" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-64" />
        </CardContent>
      </Card>

      {/* Soru Analizleri Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="h-7 w-52" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-64" />
        </CardContent>
      </Card>
    </article>
  )
}
