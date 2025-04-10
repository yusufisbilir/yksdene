import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const DashboardSkeleton = () => {
  return (
    <article className="space-y-6 px-2 sm:px-4 md:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">👑 Başarı Tablosu</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Ortalama Netler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      ))}
    </article>
  )
}

export default DashboardSkeleton
