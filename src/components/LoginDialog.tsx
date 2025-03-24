'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { User } from 'lucide-react'
import LoginGoogleButton from './LoginGoogleButton'

const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="flex items-center justify-center">
          <User className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Giriş Yap</DialogTitle>
          <DialogDescription>
            Netlerini takip et, sıralamalarda yarış. YKS çalışmayı eğlenceli hale getir. 🎉
          </DialogDescription>
        </DialogHeader>
        <LoginGoogleButton />
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
