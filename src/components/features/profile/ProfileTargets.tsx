'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/features/profile.slice'
import { Profile, UniversityProgram, updateProfileSchema, UpdateProfileValues } from '@/types'
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
import { Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import universityPrograms from '@/constants/universityPrograms/universityPrograms.json'

export default function ProfileTargets() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filteredPrograms, setFilteredPrograms] = useState<UniversityProgram[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const programsData: UniversityProgram[] = universityPrograms as UniversityProgram[]

  // Debounce searchQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery])

  // Use debounced search query for filtering
  useEffect(() => {
    if (debouncedSearchQuery.trim() === '') {
      setFilteredPrograms([])
      return
    }

    const query = debouncedSearchQuery.toLowerCase().trim()

    const searchTerms = query.split(/\s+/).filter((term) => term.length > 0)

    const results = programsData
      .filter((program) => {
        const universityLower = program.university.toLowerCase()
        const departmentLower = program.department ? program.department.toLowerCase() : ''
        const programLower = program.program ? program.program.toLowerCase() : ''

        return searchTerms.every((term) => {
          const matchesUniversity = universityLower.includes(term)
          const matchesDepartment = departmentLower.includes(term)
          const matchesProgram = programLower.includes(term)

          const universityWords = universityLower.split(/\s+/)
          const departmentWords = departmentLower.split(/\s+/)
          const programWords = programLower.split(/\s+/)

          const matchesUniversityStart = universityWords.some((word) => word.startsWith(term))
          const matchesDepartmentStart = departmentWords.some((word) => word.startsWith(term))
          const matchesProgramStart = programWords.some((word) => word.startsWith(term))

          return (
            matchesUniversity ||
            matchesDepartment ||
            matchesProgram ||
            matchesUniversityStart ||
            matchesDepartmentStart ||
            matchesProgramStart
          )
        })
      })
      .slice(0, 200)

    setFilteredPrograms(results)
  }, [debouncedSearchQuery, programsData])

  const { data: profile, isLoading } = useGetProfileQuery()

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      obp: '',
      graduated: false,
      university_program: undefined,
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        obp: profile.obp?.toString() || '',
        graduated: profile.graduated || false,
        university_program: profile.university_program || undefined,
      })
    }
  }, [profile, form, programsData])

  const handleProfileUpdate = async (updatedProfile: Partial<Profile>) => {
    try {
      await updateProfile(updatedProfile).unwrap()
      toast.success('Profil bilgileri güncellendi')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Profil güncellenirken bir hata oluştu')
    }
  }

  const onSubmit = (values: UpdateProfileValues) => {
    handleProfileUpdate({
      obp: parseFloat(values.obp),
      graduated: values.graduated,
      university_program: values.university_program ?? null,
    })
  }

  const handleProgramSelect = (program: UniversityProgram) => {
    form.setValue('university_program', program.id)
    setIsDialogOpen(false)
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

          <FormField
            control={form.control}
            name="university_program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hedef Üniversite</FormLabel>
                <FormControl>
                  <div className="flex w-full items-center space-x-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal flex items-center"
                          type="button"
                        >
                          {field.value ? (
                            <span className="truncate">
                              {
                                programsData.find((program) => program.id === field.value)
                                  ?.university
                              }{' '}
                              -{' '}
                              {programsData.find((program) => program.id === field.value)
                                ?.program || ''}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Program seç...</span>
                          )}
                          <Search className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Üniversite Programı Ara</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Üniversite, bölüm veya program adı girin..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                          />
                          {searchQuery.trim() !== '' && debouncedSearchQuery !== searchQuery && (
                            <div className="text-xs text-muted-foreground">Aranıyor...</div>
                          )}
                          <ScrollArea className="h-[300px]">
                            {filteredPrograms.length > 0 ? (
                              <div className="space-y-1">
                                {filteredPrograms.map((program) => (
                                  <div
                                    key={program.id}
                                    className="flex flex-col p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md"
                                    onClick={() => handleProgramSelect(program)}
                                  >
                                    <span className="font-medium">{program.university}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {program.department || ''} - {program.program || ''}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                      {program.description || ''}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : debouncedSearchQuery.trim() !== '' ? (
                              <div className="p-2 text-center text-muted-foreground">
                                Sonuç bulunamadı.
                              </div>
                            ) : (
                              <div className="p-2 text-center text-muted-foreground">
                                Aramaya başlamak için bir şeyler yazın.
                              </div>
                            )}
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </FormControl>
                <FormMessage />
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
