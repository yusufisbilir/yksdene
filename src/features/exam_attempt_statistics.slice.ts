import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { ExamCategoryStatistics } from '@/types/db.types'

export const examAttemptViewStatisticsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamAttemptStatistics: builder.query<ExamCategoryStatistics, void>({
      query: () => API_ROUTES.EXAM_ATTEMPT_STATISTICS,
      transformResponse: (response: { results: ExamCategoryStatistics }) => response.results,
      providesTags: ['ExamAttempts'],
    }),
  }),
})

export const { useGetExamAttemptStatisticsQuery } = examAttemptViewStatisticsSlice
