'use client'

import { useEffect, useState } from 'react'
import {
  useGetExamTemplatesQuery,
  useGetExamResultsQuery,
  useCreateExamAttemptWithResultsMutation,
  useGetSubjectsQuery,
} from '@/store/services/examApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SubjectResultInsert } from '@/types/db.types'
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from '@/components/ui/select'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface SubjectResultForm {
  subject_id: string
  correct_count: number
  incorrect_count: number
}

const examFormSchema = z.object({
  examTemplate: z.string().min(1, 'Deneme türü seçiniz'),
  examName: z.string().min(1, 'Deneme adı gereklidir'),
  examDate: z.string().min(1, 'Tarih seçiniz'),
  subjectResults: z.array(
    z.object({
      subject_id: z.string(),
      correct_count: z.number().min(0, "0'dan küçük olamaz"),
      incorrect_count: z.number().min(0, "0'dan küçük olamaz"),
    }),
  ),
})

type ExamFormValues = z.infer<typeof examFormSchema>

export default function NetTakipPage() {
  const [isAddingExam, setIsAddingExam] = useState(false)

  const { data: examTemplates, isLoading: isLoadingTemplates } = useGetExamTemplatesQuery()
  const { data: examResults, isLoading: isLoadingResults } = useGetExamResultsQuery()
  const [createExamAttemptWithResults] = useCreateExamAttemptWithResultsMutation()

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      examTemplate: examTemplates?.find((template) => template.name === 'TYT')?.id || '',
      examName: '',
      examDate: format(new Date(), 'yyyy-MM-dd'),
      subjectResults: [],
    },
  })

  const examTemplate = form.watch('examTemplate')

  const { data: subjects } = useGetSubjectsQuery(examTemplate || '', {
    skip: !examTemplate,
    refetchOnMountOrArgChange: true,
  })

  const getTotalStats = () => {
    const subjectResults = form.watch('subjectResults')
    return subjectResults.reduce(
      (acc, subject) => {
        const subjectTemplate = subjects?.find((s) => s.id === subject.subject_id)
        const questionCount = subjectTemplate?.question_count || 0
        return {
          correct: acc.correct + subject.correct_count,
          incorrect: acc.incorrect + subject.incorrect_count,
          blank: acc.blank + (questionCount - subject.correct_count - subject.incorrect_count),
          net: acc.net + (subject.correct_count - subject.incorrect_count * 0.25),
        }
      },
      { correct: 0, incorrect: 0, blank: 0, net: 0 },
    )
  }

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
      form.reset()
      setIsAddingExam(false)
    } catch (error) {
      console.error('Failed to save exam results:', error)
    }
  }

  useEffect(() => {
    form.setValue(
      'examTemplate',
      examTemplates?.find((template) => template.name === 'TYT')?.id ?? '',
    )
  }, [examTemplates])

  useEffect(() => {
    if (subjects) {
      const initialSubjectResults = subjects.map((subject) => ({
        correct_count: 0,
        incorrect_count: 0,
        subject_id: subject.id,
      }))
      form.setValue('subjectResults', initialSubjectResults)
    }
  }, [subjects, form.setValue])

  if (isLoadingTemplates || isLoadingResults) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl w-full centered_card_container">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Net Takip</h1>
        <Button onClick={() => setIsAddingExam(!isAddingExam)}>
          {isAddingExam ? 'İptal' : 'Yeni Deneme Ekle'}
        </Button>
      </div>

      {/* Add exam form */}
      {isAddingExam && (
        <Card>
          <CardHeader>
            <CardTitle>Yeni Deneme Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
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
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Sonuçlar</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {getTotalStats().correct} Doğru
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {getTotalStats().incorrect} Yanlış
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {getTotalStats().blank} Boş
                        </span>
                        <span className="text-sm font-medium">
                          {getTotalStats().net.toFixed(2)} Net
                        </span>
                      </div>
                    </div>

                    {subjects.map((subject) => {
                      const subjectIndex = form
                        .getValues('subjectResults')
                        .findIndex((s) => s.subject_id === subject.id)

                      return (
                        <div key={subject.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label>{subject.name}</Label>
                            <span className="text-sm text-muted-foreground ml-auto">
                              {subject.question_count} Soru
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`subjectResults.${subjectIndex}.correct_count`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      max={subject.question_count}
                                      placeholder="Doğru"
                                      value={field.value || ''}
                                      onFocus={(e) => e.target.select()}
                                      onChange={(e) => {
                                        const value =
                                          e.target.value === ''
                                            ? 0
                                            : Math.min(
                                                Math.max(0, parseInt(e.target.value) || 0),
                                                subject.question_count,
                                              )
                                        field.onChange(value)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`subjectResults.${subjectIndex}.incorrect_count`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      max={subject.question_count}
                                      placeholder="Yanlış"
                                      value={field.value || ''}
                                      onFocus={(e) => e.target.select()}
                                      onChange={(e) => {
                                        const value =
                                          e.target.value === ''
                                            ? 0
                                            : Math.min(
                                                Math.max(0, parseInt(e.target.value) || 0),
                                                subject.question_count,
                                              )
                                        field.onChange(value)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Kaydet
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Exam results list */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examResults?.map((result) => (
          <Card key={result.exam_attempt_id}>
            <CardHeader>
              <CardTitle className="text-lg">{result.exam_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tarih:</span>
                  <span>{format(new Date(result.date!), 'dd MMMM yyyy', { locale: tr })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doğru:</span>
                  <span className="text-green-600">{result.correct_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yanlış:</span>
                  <span className="text-red-600">{result.incorrect_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Boş:</span>
                  <span className="text-yellow-600">{result.blank_count}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Net:</span>
                  <span className={result.net_score! >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {result.net_score?.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  )
}
