import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Table, TableHead } from '@/components/ui/table'
import { TableHeader } from '@/components/ui/table'
import { adminService } from '@/services/admin.service'
import { ProfilesUniversityProgramView, UniversityProgram } from '@/types'
import universityPrograms from '@/constants/universityPrograms/universityPrograms.json'

interface UserListProps {
  userProfiles: ProfilesUniversityProgramView[]
  examCounts: Awaited<ReturnType<typeof adminService.getTotalExamAttemptsPerUser>>
}

export function UserList({ userProfiles, examCounts }: UserListProps) {
  const programsData: UniversityProgram[] = universityPrograms as UniversityProgram[]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı Listesi ({userProfiles.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>UserName</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Oluşturulma</TableHead>
              <TableHead className="text-center">Deneme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userProfiles.map((userProfile) => {
              const count = examCounts[userProfile?.profile_id ?? '']
              return (
                <TableRow key={userProfile.profile_id}>
                  <TableCell className="font-mono text-xs">{userProfile.name}</TableCell>
                  <TableCell>{userProfile?.username ?? '-'}</TableCell>
                  <TableCell>{userProfile.profile_id}</TableCell>
                  <TableCell>
                    {
                      programsData?.find((program) => program.id === userProfile.university_program)
                        ?.university
                    }
                  </TableCell>
                  <TableCell>
                    {
                      programsData?.find((program) => program.id === userProfile.university_program)
                        ?.program
                    }
                  </TableCell>
                  <TableCell>
                    {userProfile.created_at
                      ? new Date(userProfile.created_at).toLocaleString()
                      : '-'}
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
