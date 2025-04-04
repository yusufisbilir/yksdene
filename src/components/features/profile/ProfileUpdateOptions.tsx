'use client'

import React from 'react'
import { toast } from 'sonner'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/features/profile.slice'
import { obpGraduateFormSchema, Profile, ProfileFormValues } from '@/types'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
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
import { Checkbox } from '@/components/ui/checkbox'

const ProfileUpdateOptions = () => {
  const router = useRouter()

  const { data: profile, isLoading } = useGetProfileQuery()

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(obpGraduateFormSchema),
    defaultValues: {
      obp: profile?.obp?.toString() || '',
      graduated: profile?.graduated || false,
    },
  })

  React.useEffect(() => {
    if (profile) {
      form.reset({
        obp: profile.obp?.toString() || '',
        graduated: profile.graduated || false,
      })
    }
  }, [profile, form])

  const handleProfileUpdate = async (updatedProfile: Partial<Profile>) => {
    try {
      await updateProfile(updatedProfile).unwrap()
      toast.success('Profil bilgileri güncellendi')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Profil güncellenirken bir hata oluştu')
    }
  }

  const onSubmit = (values: ProfileFormValues) => {
    handleProfileUpdate({
      obp: parseFloat(values.obp),
      graduated: values.graduated,
    })
  }

  if (isLoading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">YKS Profil Bilgileri</h3>
        <p className="text-sm text-muted-foreground">
          YKS hazırlık sürecinizde kullanılacak bilgilerinizi güncelleyin.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="obp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ortaöğretim Başarı Puanı (OBP)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.01" min="50" max="100" />
                </FormControl>
                <FormDescription>Lise diplomandaki OBP puanını gir (50-100 arası).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="graduated"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Mezun Durumu</FormLabel>
                  <FormDescription>Liseden mezun olduysanız işaretleyin.</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProfileUpdateOptions
