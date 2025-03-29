import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { ExamAttemptView } from '@/types/db.types'

export const examAttemptSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteExamAttempt: builder.mutation({
      query: (id) => ({
        url: `${API_ROUTES.EXAM_ATTEMPT}/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { results: ExamAttemptView[] }) => response.results,
      invalidatesTags: ['ExamAttempts'],
    }),
  }),
})

export const { useDeleteExamAttemptMutation } = examAttemptSlice
