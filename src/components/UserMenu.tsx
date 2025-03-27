'use client'
import { LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/nextjs'

export function UserMenu() {
  const { user } = useUser()
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button variant="outline" className="w-full">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Giriş Yap</span>
            </div>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm font-medium text-muted-foreground">{user?.fullName}</p>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Çıkış Yap</span>
              </div>
            </Button>
          </div>
        </SignOutButton>
      </SignedIn>
    </>
  )
}
