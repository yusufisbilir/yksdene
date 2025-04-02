import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { LastExamResults } from '@/services/last_exam_results.service'

export const examResultsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLastExamResults: builder.query<LastExamResults, void>({
      query: () => API_ROUTES.LAST_EXAM_RESULTS,
      transformResponse: (response: { result: LastExamResults }) => response.result,
      providesTags: ['ExamAttempts'],
    }),
  }),
})

export const { useGetLastExamResultsQuery } = examResultsSlice
