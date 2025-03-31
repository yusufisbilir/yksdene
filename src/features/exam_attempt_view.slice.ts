import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { ExamAttemptView } from '@/types/db.types'

export const examAttemptViewSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamAttemptView: builder.query<ExamAttemptView[], void>({
      query: () => API_ROUTES.EXAM_ATTEMPT_VIEW,
      transformResponse: (response: { results: ExamAttemptView[] }) => response.results ?? [],
      providesTags: ['ExamAttempts'],
    }),
  }),
})

export const { useGetExamAttemptViewQuery } = examAttemptViewSlice
