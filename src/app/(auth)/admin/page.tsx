import { SuspenseProvider } from '@/components/shared/SuspenseProvider'
import AdminPanel from '@/components/features/admin/AdminPanel'

export default function AdminPage() {
  return (
    <SuspenseProvider
      fallback={
        <div className="flex items-center justify-center p-10">
          <p>Yükleniyor...</p>
        </div>
      }
    >
      <article className="panel">
        <AdminPanel />
      </article>
    </SuspenseProvider>
  )
}
