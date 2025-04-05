import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Table, TableHead } from '@/components/ui/table'
import { TableHeader } from '@/components/ui/table'
import { adminService } from '@/services/admin.service'
import { Profile } from '@/types'

interface UserListProps {
  users: Profile[]
  examCounts: Awaited<ReturnType<typeof adminService.getTotalExamAttemptsPerUser>>
}

export function UserList({ users, examCounts }: UserListProps) {
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
              <TableHead>UserName</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Mezun</TableHead>
              <TableHead>OBP</TableHead>
              <TableHead>Oluşturulma</TableHead>
              <TableHead className="text-center">Deneme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const count = examCounts[user.id]
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.name}</TableCell>
                  <TableCell>{user?.username ?? '-'}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.graduated ? 'Evet' : 'Hayır'}</TableCell>
                  <TableCell>{user.obp}</TableCell>
                  <TableCell>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell className="text-center">{count ?? '-'}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
