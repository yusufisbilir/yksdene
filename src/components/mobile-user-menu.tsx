'use client'
import { LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'

export function MobileUserMenu() {
  const { user } = useUser()
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button variant="outline" className="w-full">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Giriş Yap</span>
            </div>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">{user?.fullName}</p>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Çıkış Yap</span>
              </div>
            </Button>
          </div>
        </SignOutButton>
      </SignedIn>
    </>
  )
}
