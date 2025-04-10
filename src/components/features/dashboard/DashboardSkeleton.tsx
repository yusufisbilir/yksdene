import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const DashboardSkeleton = () => {
  return (
    <article className="space-y-6 px-2 sm:px-4 md:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">👑 Başarı Tablosu</h1>

      {/* YKS Ranking Change Cards Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="h-7 w-64" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* YKS Ranking Table Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="h-7 w-56" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
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
          <Skeleton className="h-72 w-full" />
        </CardContent>
      </Card>

      {/* Denemelerim Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="h-7 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performans Takibi Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            <Skeleton className="h-7 w-56" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
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
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </article>
  )
}

export default DashboardSkeleton
