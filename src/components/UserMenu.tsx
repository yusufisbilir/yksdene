'use client'
import { User } from 'lucide-react'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export function UserMenu() {
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
        <UserButton />
      </SignedIn>
    </>
  )
}
