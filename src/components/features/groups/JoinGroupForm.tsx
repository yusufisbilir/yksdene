'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useJoinGroupMutation } from '@/features/group.slice'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'

const joinGroupSchema = z.object({
  groupId: z.string().uuid('Geçerli bir grup ID girin'),
  joinCode: z.string().optional(),
})

type FormData = z.infer<typeof joinGroupSchema>

export default function JoinGroupForm() {
  const router = useRouter()
  const [joinGroup, { isLoading }] = useJoinGroupMutation()

  const form = useForm<FormData>({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: {
      groupId: '',
      joinCode: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await joinGroup({
        groupId: data.groupId,
        joinCode: data.joinCode || undefined,
      }).unwrap()

      toast.success('Gruba başarıyla katıldınız')
      router.push(ROUTES.GROUP_DETAIL(data.groupId))
    } catch (error) {
      console.error('Gruba katılma hatası:', error)
      toast.error('Gruba katılırken bir hata oluştu. Grup ID ve katılım kodunu kontrol edin.')
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Gruba Katıl</CardTitle>
        <CardDescription>
          Bir gruba katılmak için grup ID'si ve özel gruplar için katılım kodu girin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grup ID</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678-1234-1234-1234-123456789012" {...field} />
                  </FormControl>
                  <FormDescription>Katılmak istediğiniz grubun ID'sini girin</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="joinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Katılım Kodu (Özel gruplar için)</FormLabel>
                  <FormControl>
                    <Input placeholder="Katılım kodu (opsiyonel)" {...field} />
                  </FormControl>
                  <FormDescription>Özel gruplar için katılım kodu gereklidir</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push(ROUTES.GROUPS)}>
                İptal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Katılınıyor...' : 'Gruba Katıl'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
