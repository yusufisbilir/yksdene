import { adminService } from '@/services/admin.service'
import { SuspenseProvider } from '@/components/shared/SuspenseProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Profile } from '@/types'

interface UserListProps {
  users: Profile[]
  examCounts: Awaited<ReturnType<typeof adminService.getExamCountsPerUser>>
}

function UserList({ users, examCounts }: UserListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı Listesi ({users.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Mezun</TableHead>
              <TableHead>OBP</TableHead>
              <TableHead>Oluşturulma</TableHead>
              <TableHead>TYT</TableHead>
              <TableHead>AYT Say</TableHead>
              <TableHead>AYT EA</TableHead>
              <TableHead>AYT Söz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const counts = examCounts[user.id] || {
                TYT: 0,
                AYT_Sayisal: 0,
                AYT_EsitAgirlik: 0,
                AYT_Sozel: 0,
              }
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.name}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.graduated ? 'Evet' : 'Hayır'}</TableCell>
                  <TableCell>{user.obp}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{counts.TYT}</TableCell>
                  <TableCell>{counts.AYT_Sayisal}</TableCell>
                  <TableCell>{counts.AYT_EsitAgirlik}</TableCell>
                  <TableCell>{counts.AYT_Sozel}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

async function AdminData() {
  const users = await adminService.getAllUsers()
  const examCounts = await adminService.getExamCountsPerUser()
  return <UserList users={users} examCounts={examCounts} />
}

export default function AdminPage() {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Admin Paneli</h1>
      <SuspenseProvider
        fallback={
          <div className="flex items-center justify-center p-10">
            <p>Yükleniyor...</p>
          </div>
        }
      >
        <AdminData />
      </SuspenseProvider>
      {/* Add other admin components here later */}
    </div>
  )
}
