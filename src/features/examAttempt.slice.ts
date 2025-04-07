import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import {
  ExamAttemptInsert,
  ExamAttemptView,
  ExamCategoryStatistics,
  LastExamResults,
  SubjectResultInsert,
} from '@/types'

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

    getExamAttemptView: builder.query<ExamAttemptView[], void>({
      query: () => API_ROUTES.EXAM_ATTEMPT_VIEW,
      transformResponse: (response: { results: ExamAttemptView[] }) => response.results ?? [],
      providesTags: ['ExamAttempts'],
    }),

    getExamAttemptStatistics: builder.query<ExamCategoryStatistics, void>({
      query: () => API_ROUTES.EXAM_ATTEMPT_STATISTICS,
      transformResponse: (response: { results: ExamCategoryStatistics }) => response.results,
      providesTags: ['ExamAttempts'],
    }),

    getLastExamResults: builder.query<LastExamResults, void>({
      query: () => API_ROUTES.LAST_EXAM_RESULTS,
      transformResponse: (response: { result: LastExamResults }) => response.result,
      providesTags: ['ExamAttempts'],
    }),
  }),
})

export const {
  useDeleteExamAttemptMutation,
  useCreateExamAttemptWithResultsMutation,
  useGetExamAttemptViewQuery,
  useGetExamAttemptStatisticsQuery,
  useGetLastExamResultsQuery,
} = examAttemptSlice
