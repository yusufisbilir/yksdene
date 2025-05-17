import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white border-2 shadow-lg rounded-xl dark:bg-gray-800/60 border-primary/10">
      {/* Profile Header Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* User Avatar and Name Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="rounded-full w-28 h-28 md:w-32 md:h-32" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 md:h-7 w-36" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 p-3 border border-purple-100 rounded-lg shadow-sm bg-purple-50 dark:bg-purple-950/30 dark:border-purple-900">
            <Skeleton className="w-5 h-5 rounded" />
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-purple-100 rounded-lg shadow-sm bg-purple-50 dark:bg-purple-950/30 dark:border-purple-900">
            <Skeleton className="w-5 h-5 rounded" />
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Skeleton */}
      <div className="flex flex-col flex-grow gap-4 text-left">
        <div className="grid grid-cols-1 gap-3">
          <div className="relative p-4 border border-orange-100 rounded-lg bg-orange-50 dark:bg-orange-950/30 dark:border-orange-900">
            <div className="absolute px-2 py-1 text-xs font-medium rounded-full shadow-sm -top-2 right-3">
              <Skeleton className="w-12 h-5" />
            </div>
            <div className="flex items-start gap-2">
              <Skeleton className="w-5 h-5 mt-0.5 rounded" />
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <div className="flex items-center sm:self-end gap-2 mt-1">
                  <Skeleton className="w-5 h-5 rounded" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback and Buttons Skeleton */}
        <div className="grid grid-cols-1 gap-3 mt-2">
          <Skeleton className="w-full h-12" />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Skeleton className="w-full h-8 sm:w-28" />
          <Skeleton className="w-full h-8 sm:w-44" />
        </div>
      </div>
    </div>
  )
}
