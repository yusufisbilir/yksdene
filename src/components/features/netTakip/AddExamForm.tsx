'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { examFormSchema, ExamFormValues } from '@/components/features/netTakip/types'
import { examTemplates, subjects as dbSubjects } from '@/constants/db.constants'
import { useCreateExamAttemptWithResultsMutation } from '@/features/exam_attempt.slice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { TotalStats } from './TotalStats'
import { SubjectResults } from './SubjectResults'
import { useExamAttemptContext } from '@/contexts/ExamAttemptContext'
import { calculateExamResults } from '@/utils/calculateExamResults'

export function AddExamForm() {
  const { isAddingExamAttempt, setIsAddingExamAttempt } = useExamAttemptContext()
  const [subjects, setSubjects] = useState(dbSubjects)
  const [createExamAttemptWithResults, { isLoading: isLoadingCreateExamAttemptWithResults }] =
    useCreateExamAttemptWithResultsMutation()

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      examTemplate: examTemplates?.find((template) => template.name === 'TYT')?.id || '',
      examName: '',
      examDate: format(new Date(), 'yyyy-MM-dd'),
      subjectResults: [],
    },
  })

  const onSubmit = async (data: ExamFormValues) => {
    try {
      await createExamAttemptWithResults({
        examAttempt: {
          name: data.examName,
          date: data.examDate,
          exam_template_id: data.examTemplate,
        },
        subjectResults: data.subjectResults,
      }).unwrap()

      // Reset form
      setIsAddingExamAttempt(false)
      form.reset()
    } catch (error) {
      console.error('Failed to save exam results:', error)
    }
  }

  useEffect(() => {
    if (subjects) {
      const initialSubjectResults = subjects.map((subject) => ({
        correct_count: 0,
        incorrect_count: 0,
        subject_id: subject.id,
      }))
      form.setValue('subjectResults', initialSubjectResults)
    }
  }, [subjects, form.setValue, form])

  const examTemplate = form.watch('examTemplate')

  useEffect(() => {
    if (examTemplate) {
      const filteredSubjects = dbSubjects.filter(
        (subject) => subject.exam_template_id === examTemplate,
      )
      setSubjects(filteredSubjects)
      form.setValue(
        'examName',
        `${examTemplates.find((template) => template.id === examTemplate)?.name} Denemesi`,
      )
    }
  }, [examTemplate, form])

  if (!isAddingExamAttempt) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yeni Deneme Ekle</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="examTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deneme Türü</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {examTemplates?.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input placeholder="Deneme adını girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarih</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.getValues('examTemplate') && subjects && (
              <div className="space-y-4">
                <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
                  <h3 className="font-semibold">Sonuçlar</h3>
                  <TotalStats {...calculateExamResults(form.watch('subjectResults'))} />
                </div>
                <SubjectResults form={form} subjects={subjects} />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoadingCreateExamAttemptWithResults}
            >
              {isLoadingCreateExamAttemptWithResults ? '...Kaydediliyor' : 'Kaydet'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
