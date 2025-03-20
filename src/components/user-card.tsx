import { useAppDispatch } from '@/hooks/useRedux'
import { useAppSelector } from '@/hooks/useRedux'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { signOut } from '@/store/slices/auth.slice'
import { Button } from './ui/button'

const UserCard = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  if (!user) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.user_metadata.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" variant="destructive" onClick={handleSignOut}>
          Çıkış Yap
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserCard
