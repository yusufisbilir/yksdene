import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import {
  ExamAttemptInsert,
  ExamAttemptView,
  ExamCategoryStatistics,
  SubjectResultInsert,
  YksRanking,
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

    getYKSRanking: builder.query<YksRanking[], void>({
      query: () => API_ROUTES.YKS_RANKING,
      transformResponse: (response: { result: YksRanking[] }) => response.result,
      providesTags: ['ExamAttempts'],
    }),
  }),
})

export const {
  useDeleteExamAttemptMutation,
  useCreateExamAttemptWithResultsMutation,
  useGetExamAttemptViewQuery,
  useGetYKSRankingQuery,
  useGetExamAttemptStatisticsQuery,
} = examAttemptSlice
