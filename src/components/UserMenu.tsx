import { User } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import LoginDialog from './login-dialog'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { signOut } from '@/store/slices/auth.slice'

export function UserMenu() {
  const { user, isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  if (isLoading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
  }

  if (!user) {
    return <LoginDialog />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">{user.user_metadata.name ?? user.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2 flex flex-col gap-2">
        <DropdownMenuLabel className="font-medium">{user.email}</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
