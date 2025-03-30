'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { AddExamForm } from '@/components/features/netTakip/AddExamForm'
import { ExamResultsList } from '@/components/features/netTakip/ExamResultsList'
import { examFormSchema, ExamFormValues } from '@/components/features/netTakip/types'
import { examTemplates, subjects as dbSubjects } from '@/constants/db.constants'
import { useGetExamAttemptViewQuery } from '@/features/exam_attempt_view.slice'
import { useCreateExamAttemptWithResultsMutation } from '@/features/exam_attempt.slice'
import PageLoader from '@/components/shared/PageLoader'

export default function NetTakipPage() {
  const [isAddingExam, setIsAddingExam] = useState(false)
  const [subjects, setSubjects] = useState(dbSubjects)
  const { data: examAttemptViews, isLoading: isLoadingExamAttemptViews } =
    useGetExamAttemptViewQuery()
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

  const examTemplate = form.watch('examTemplate')

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
    if (subjects) {
      const initialSubjectResults = subjects.map((subject) => ({
        correct_count: 0,
        incorrect_count: 0,
        subject_id: subject.id,
      }))
      form.setValue('subjectResults', initialSubjectResults)
    }
  }, [subjects, form.setValue, form])

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

  if (isLoadingExamAttemptViews) {
    return <PageLoader />
  }

  return (
    <article className="space-y-6 panel">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold sm:text-3xl">Denemelerim</h1>
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
        >
          <AddExamForm.SubmitButton disabled={isLoadingCreateExamAttemptWithResults}>
            {isLoadingCreateExamAttemptWithResults ? (
              <div className="flex items-center gap-4">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <p>Deneme Kaydediliyor...</p>
              </div>
            ) : (
              'Kaydet'
            )}
          </AddExamForm.SubmitButton>
        </AddExamForm>
      )}

      {/* Exam results list */}
      <ExamResultsList results={examAttemptViews || []} />
    </article>
  )
}
