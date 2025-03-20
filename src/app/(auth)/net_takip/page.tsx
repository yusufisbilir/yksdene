'use client'

import { useEffect, useState } from 'react'
import {
  useGetExamTemplatesQuery,
  useCreateExamAttemptWithResultsMutation,
  useGetSubjectsQuery,
  useGetExamAttemptViewsQuery,
} from '@/store/services/exam.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { AddExamForm } from '@/components/net_takip/add-exam-form'
import { ExamResultsList } from '@/components/net_takip/exam-results-list'
import { examFormSchema, ExamFormValues } from '@/components/net_takip/types'

export default function NetTakipPage() {
  const [isAddingExam, setIsAddingExam] = useState(false)

  const { data: examTemplates, isLoading: isLoadingTemplates } = useGetExamTemplatesQuery()
  const { data: examAttemptViews, isLoading: isLoadingExamAttemptViews } =
    useGetExamAttemptViewsQuery()
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
    form.setValue(
      'examName',
      `${examTemplates?.find((template) => template.name === 'TYT')?.name} Denemesi`,
    )
  }, [examTemplates, form])

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

  if (isLoadingTemplates || isLoadingExamAttemptViews) {
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
        <h1 className="text-2xl sm:text-3xl font-bold">Net Takip</h1>
        <Button onClick={() => setIsAddingExam(!isAddingExam)}>
          {isAddingExam ? 'İptal' : 'Deneme Ekle'}
        </Button>
      </div>

      {/* Add exam form */}
      {isAddingExam && (
        <AddExamForm
          form={form}
          examTemplates={examTemplates || []}
          subjects={subjects || []}
          onSubmit={onSubmit}
        />
      )}

      {/* Exam results list */}
      <ExamResultsList results={examAttemptViews || []} />
    </div>
  )
}
