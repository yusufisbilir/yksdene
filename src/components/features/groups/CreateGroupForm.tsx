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
import { useCreateGroupMutation } from '@/features/group.slice'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useEffect } from 'react'

const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, 'Grup adı en az 3 karakter olmalıdır')
    .max(50, 'Grup adı en fazla 50 karakter olabilir'),
  description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').optional(),
  isPublic: z.boolean().default(false),
  joinCode: z
    .string()
    .min(4, 'Katılım kodu en az 4 karakter olmalıdır')
    .max(20, 'Katılım kodu en fazla 20 karakter olabilir')
    .optional(),
})

type FormData = z.infer<typeof createGroupSchema>

export default function CreateGroupForm() {
  const router = useRouter()
  const [createGroup, { isLoading }] = useCreateGroupMutation()

  const form = useForm<FormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      isPublic: true,
      joinCode: undefined,
    },
  })

  const isPublic = form.watch('isPublic')

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createGroup({
        name: data.name,
        description: data.description || undefined,
        isPublic: data.isPublic,
        joinCode: !data.isPublic ? data.joinCode || undefined : undefined,
      }).unwrap()

      toast.success('Grup başarıyla oluşturuldu')
      router.push(ROUTES.GROUP_DETAIL(result.id))
    } catch (error) {
      console.error('Grup oluşturma hatası:', error)
      toast.error('Grup oluşturulurken bir hata oluştu')
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Yeni Grup Oluştur</CardTitle>
        <CardDescription>
          Birlikte çalışabileceğiniz ve ilerlemenizi takip edebileceğiniz bir grup oluşturun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grup Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="YKS Çalışma Grubu" {...field} />
                  </FormControl>
                  <FormDescription>Grubunuzun adı herkes tarafından görülebilir</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Grubunuzun amacını ve hedeflerini belirtin" {...field} />
                  </FormControl>
                  <FormDescription>Grup açıklaması isteğe bağlıdır</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Açık Grup</FormLabel>
                    <FormDescription>
                      Açık gruplara herkes katılabilir, özel gruplara ise sadece davet ile katılım
                      sağlanabilir
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {!isPublic && (
              <FormField
                control={form.control}
                name="joinCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Katılım Kodu</FormLabel>
                    <FormControl>
                      <Input placeholder="yk5d3n3" {...field} />
                    </FormControl>
                    <FormDescription>Özel gruplara katılmak için kullanılacak kod</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push(ROUTES.GROUPS)}>
                İptal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Oluşturuluyor...' : 'Grup Oluştur'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
