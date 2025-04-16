import { UserList } from './UserList'
import { adminService } from '@/services/admin.service'

export async function AdminData() {
  const userProfiles = await adminService.getAllProfilesWithUniversityProgram()
  const examCounts = await adminService.getTotalExamAttemptsPerUser()
  return <UserList userProfiles={userProfiles ?? []} examCounts={examCounts} />
}
