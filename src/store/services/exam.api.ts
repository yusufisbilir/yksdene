import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ExamAttempt,
  ExamAttemptView,
  ExamAttemptInsert,
  SubjectResultInsert,
  ExamAttemptWithResults,
} from '@/types/db.types'
import {
  createExamAttemptWithResults,
  deleteExamAttempt,
  getExamAttemptViews,
} from '@/lib/supabase/actions/exam.actions'
import { toast } from 'sonner'

const handleError = (error: unknown) => {
  console.error('API Error:', error)
  toast.error(error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.')
  throw {
    status: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.',
  }
}

export const examApi = createApi({
  reducerPath: 'examApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['ExamTemplates', 'ExamAttempts', 'Subjects', 'SubjectResults', 'ExamAttemptView'],
  endpoints: (builder) => ({
    // Exam Attempt View
    getExamAttemptViews: builder.query<ExamAttemptView[], void>({
      queryFn: async () => {
        try {
          const data = await getExamAttemptViews()
          return { data }
        } catch (error) {
          return { error: handleError(error) }
        }
      },
      providesTags: ['ExamAttemptView'],
    }),

    // Exam Attempts
    deleteExamAttempt: builder.mutation<ExamAttempt[] | null, string>({
      queryFn: async (id) => {
        try {
          const result = await deleteExamAttempt(id)
          return { data: result }
        } catch (error) {
          return { error: handleError(error) }
        }
      },
      invalidatesTags: ['ExamAttempts', 'SubjectResults', 'ExamAttemptView'],
    }),

    // Transactional operation: Create exam attempt with subject results
    createExamAttemptWithResults: builder.mutation<
      ExamAttemptWithResults,
      {
        examAttempt: ExamAttemptInsert
        subjectResults: Omit<SubjectResultInsert, 'exam_attempt_id'>[]
      }
    >({
      queryFn: async ({ examAttempt, subjectResults }) => {
        try {
          const data = await createExamAttemptWithResults({
            examAttempt,
            subjectResults,
          })

          return { data }
        } catch (error) {
          return { error: handleError(error) }
        }
      },
      invalidatesTags: ['ExamAttempts', 'SubjectResults', 'ExamAttemptView'],
    }),
  }),
})

export const {
  useDeleteExamAttemptMutation,
  useCreateExamAttemptWithResultsMutation,
  useGetExamAttemptViewsQuery,
} = examApi
