import { UserList } from './UserList'
import { adminService } from '@/services/admin.service'

export async function AdminData() {
  const users = await adminService.getAllUsers()
  const examCounts = await adminService.getTotalExamAttemptsPerUser()
  return <UserList users={users} examCounts={examCounts} />
}
