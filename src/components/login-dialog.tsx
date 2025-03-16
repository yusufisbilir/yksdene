import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LogIn, User } from 'lucide-react'

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
        <Button type="submit" className="flex items-center gap-2 justify-center">
          <LogIn className="w-2 h-2" /> Google ile Giriş Yap
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
