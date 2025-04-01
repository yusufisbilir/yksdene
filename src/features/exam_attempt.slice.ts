import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { ExamAttemptInsert, ExamAttemptView, SubjectResultInsert } from '@/types'

export const examAttemptSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteExamAttempt: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ROUTES.EXAM_ATTEMPT,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['ExamAttempts'],
    }),

    createExamAttemptWithResults: builder.mutation<
      void,
      {
        examAttempt: ExamAttemptInsert
        subjectResults: Omit<SubjectResultInsert, 'exam_attempt_id'>[]
      }
    >({
      query: ({ examAttempt, subjectResults }) => ({
        url: API_ROUTES.EXAM_ATTEMPT_CREATE,
        method: 'POST',
        body: { examAttempt, subjectResults },
      }),
      invalidatesTags: ['ExamAttempts'],
    }),
  }),
})

export const { useDeleteExamAttemptMutation, useCreateExamAttemptWithResultsMutation } =
  examAttemptSlice
