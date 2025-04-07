'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { examTemplates, subjects as dbSubjects } from '@/constants/db.constants'
import { useCreateExamAttemptWithResultsMutation } from '@/features/examAttempt.slice'
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
import { CreateExamAttemptInput, createExamAttemptSchema } from '@/types'

export function AddExamForm() {
  const { isAddingExamAttempt, setIsAddingExamAttempt } = useExamAttemptContext()
  const [createExamAttemptWithResults, { isLoading: isLoadingCreateExamAttemptWithResults }] =
    useCreateExamAttemptWithResultsMutation()

  const defaultExamTemplate = examTemplates?.find((template) => template.name === 'TYT')?.id || ''

  const form = useForm<CreateExamAttemptInput>({
    resolver: zodResolver(createExamAttemptSchema),
    defaultValues: {
      examAttempt: {
        exam_template_id: defaultExamTemplate,
        name: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      },
      subjectResults: [],
    },
  })

  const onSubmit = async (data: CreateExamAttemptInput) => {
    try {
      await createExamAttemptWithResults({
        examAttempt: {
          name: data.examAttempt.name,
          date: data.examAttempt.date,
          exam_template_id: data.examAttempt.exam_template_id,
        },
        subjectResults: data.subjectResults,
      }).unwrap()

      // Reset form
      setIsAddingExamAttempt(false)
      form.reset({
        examAttempt: {
          exam_template_id: defaultExamTemplate,
          name: '',
          date: format(new Date(), 'yyyy-MM-dd'),
        },
        subjectResults: [],
      })
    } catch (error) {
      console.error('Failed to save exam results:', error)
    }
  }

  const examTemplate = form.watch('examAttempt.exam_template_id')
  useEffect(() => {
    const filteredSubjects = dbSubjects.filter(
      (subject) => subject.exam_template_id === examTemplate,
    )
    form.setValue(
      'subjectResults',
      filteredSubjects.map((subject) => ({
        correct_count: 0,
        incorrect_count: 0,
        subject_id: subject.id,
      })),
    )
    form.setValue(
      'examAttempt.name',
      `${examTemplates.find((template) => template.id === examTemplate)?.name} Denemesi`,
    )
  }, [examTemplate])

  useEffect(() => {
    if (isAddingExamAttempt) {
      form.setValue('examAttempt.exam_template_id', defaultExamTemplate)

      const filteredSubjects = dbSubjects.filter(
        (subject) => subject.exam_template_id === defaultExamTemplate,
      )
      form.setValue(
        'subjectResults',
        filteredSubjects.map((subject) => ({
          correct_count: 0,
          incorrect_count: 0,
          subject_id: subject.id,
        })),
      )
      form.setValue(
        'examAttempt.name',
        `${examTemplates.find((template) => template.id === defaultExamTemplate)?.name} Denemesi`,
      )
    }
  }, [isAddingExamAttempt, defaultExamTemplate, form])

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
                name="examAttempt.exam_template_id"
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
                name="examAttempt.name"
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
                name="examAttempt.date"
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

            {form.watch('subjectResults')?.length ? (
              <div className="space-y-4">
                <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
                  <h3 className="font-semibold">Sonuçlar</h3>
                  <TotalStats {...calculateExamResults(form.watch('subjectResults'))} />
                </div>
                <SubjectResults
                  form={form}
                  subjects={dbSubjects?.filter(
                    (subject) =>
                      form.watch('examAttempt.exam_template_id') === subject.exam_template_id,
                  )}
                />
              </div>
            ) : null}

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
