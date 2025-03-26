import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ExamAttempt,
  SubjectResult,
  ExamAttemptView,
  ExamAttemptInsert,
  SubjectResultInsert,
  ExamAttemptWithResults,
} from '@/types/db.types'
import {
  calculateExamTemplateStatistics,
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

    // Statistics and Analytics
    // getExamStatistics: builder.query<ExamStatistics, string>({
    //   queryFn: async () => {
    //     try {
    //       const data = await calculateExamTemplateStatistics()
    //       return { data }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: (result, error, examTemplateId) => [
    //     { type: 'ExamAttemptView', id: examTemplateId },
    //   ],
    // }),

    // Update both exam attempt and subject results
    // updateExamAttemptWithResults: builder.mutation<
    //   ExamAttemptWithResults,
    //   {
    //     id: string
    //     examAttempt: Partial<ExamAttemptInsert>
    //     subjectResults: SubjectResultInsert[]
    //   }
    // >({
    //   queryFn: async ({ id, examAttempt, subjectResults }) => {
    //     try {
    //       const supabase = await createClient()

    //       // 1. Update exam attempt
    //       const { data: examAttemptData, error: examAttemptError } = await supabase
    //         .from('exam_attempts')
    //         .update({ ...examAttempt, updated_at: new Date().toISOString() })
    //         .eq('id', id)
    //         .select()
    //         .single()

    //       if (examAttemptError) throw examAttemptError

    //       // 2. Delete existing subject results
    //       const { error: deleteError } = await supabase
    //         .from('subject_results')
    //         .delete()
    //         .eq('exam_attempt_id', id)

    //       if (deleteError) throw deleteError

    //       // 3. Create new subject results
    //       const { data: subjectResultsData, error: subjectResultsError } = await supabase
    //         .from('subject_results')
    //         .insert(subjectResults)
    //         .select()

    //       if (subjectResultsError) throw subjectResultsError

    //       return {
    //         data: {
    //           examAttempt: examAttemptData,
    //           subjectResults: subjectResultsData,
    //         },
    //       }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: 'ExamAttempts', id },
    //     { type: 'SubjectResults', id },
    //     'ExamAttemptView',
    //   ],
    // }),

    // getSubjectTrends: builder.query<SubjectTrend[], string>({
    //   queryFn: async (examTemplateId) => {
    //     try {
    //       const supabase = await createClient()
    //       const { data: results, error } = await supabase
    //         .from('exam_results_view')
    //         .select('*')
    //         .eq('exam_template_id', examTemplateId)
    //         .order('date', { ascending: true })

    //       if (error) throw error

    //       // Group results by subject
    //       const subjectTrendsMap = results.reduce((acc, curr) => {
    //         if (!acc[curr.subject_name]) {
    //           acc[curr.subject_name] = {
    //             subject_name: curr.subject_name,
    //             data: [],
    //           }
    //         }

    //         // Check if this date already exists and has data for this subject
    //         const existingEntry = acc[curr.subject_name].data.find(
    //           (entry) => entry.date === curr.date && entry.exam_attempt_id === curr.exam_attempt_id,
    //         )

    //         if (!existingEntry) {
    //           acc[curr.subject_name].data.push({
    //             date: curr.date,
    //             exam_attempt_id: curr.exam_attempt_id,
    //             net_score: Number(curr.net_score.toFixed(2)),
    //           })
    //         }

    //         return acc
    //       }, {})

    //       // Sort data points by date for each subject
    //       Object.values(subjectTrendsMap).forEach((subject: any) => {
    //         subject.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    //       })

    //       return { data: Object.values(subjectTrendsMap) }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: (result, error, examTemplateId) => [
    //     { type: 'ExamAttemptView', id: examTemplateId },
    //   ],
    // }),

    // getPerformanceTimeline: builder.query<
    //   Array<{ date: string; category: string; total_net: number }>,
    //   void
    // >({
    //   queryFn: async () => {
    //     try {
    //       const supabase = await createClient()
    //       const { data: results, error } = await supabase
    //         .from('exam_results_view')
    //         .select('*')
    //         .order('date', { ascending: true })

    //       if (error) throw error

    //       // Group by date and category
    //       const timelineData = results.reduce((acc, curr) => {
    //         const key = `${curr.date}-${curr.category}`
    //         if (!acc[key]) {
    //           acc[key] = {
    //             date: curr.date,
    //             category: curr.category,
    //             exam_attempt_id: curr.exam_attempt_id,
    //             subjects: {},
    //           }
    //         }

    //         // Accumulate net scores by subject
    //         if (!acc[key].subjects[curr.subject_name]) {
    //           acc[key].subjects[curr.subject_name] = curr.net_score
    //         }

    //         return acc
    //       }, {})

    //       // Calculate total net score for each entry
    //       const formattedData = Object.values(timelineData).map((entry: any) => {
    //         const total_net = Object.values(entry.subjects).reduce(
    //           (sum: number, score: number) => sum + score,
    //           0,
    //         )

    //         return {
    //           date: entry.date,
    //           category: entry.category,
    //           total_net: Number(total_net.toFixed(2)),
    //         }
    //       })

    //       return {
    //         data: formattedData.sort(
    //           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    //         ),
    //       }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: ['ExamAttemptView'],
    // }),

    // Category comparison - Compare different exam categories
    // getCategoryComparison: builder.query<
    //   Array<{ category: string; average_net: number; attempts: number }>,
    //   void
    // >({
    //   queryFn: async () => {
    //     try {
    //       const supabase = await createClient()
    //       const { data: results, error } = await supabase.from('exam_results_view').select('*')

    //       if (error) throw error

    //       // Group by attempt and category first
    //       const attemptCategoryScores = results.reduce((acc, curr) => {
    //         const key = `${curr.exam_attempt_id}-${curr.category}`
    //         if (!acc[key]) {
    //           acc[key] = {
    //             category: curr.category,
    //             subjects: {},
    //             total_net: 0,
    //           }
    //         }

    //         if (!acc[key].subjects[curr.subject_name]) {
    //           acc[key].subjects[curr.subject_name] = curr.net_score
    //           acc[key].total_net += curr.net_score
    //         }

    //         return acc
    //       }, {})

    //       // Now group by category
    //       const categoryStats = Object.values(attemptCategoryScores).reduce(
    //         (acc: any, curr: any) => {
    //           if (!acc[curr.category]) {
    //             acc[curr.category] = {
    //               category: curr.category,
    //               net_scores: [],
    //               attempts: 0,
    //             }
    //           }

    //           acc[curr.category].net_scores.push(curr.total_net)
    //           acc[curr.category].attempts += 1

    //           return acc
    //         },
    //         {},
    //       )

    //       // Calculate averages
    //       const comparison = Object.values(categoryStats).map((cat: any) => ({
    //         category: cat.category,
    //         average_net: Number(
    //           (cat.net_scores.reduce((sum, score) => sum + score, 0) / cat.attempts).toFixed(2),
    //         ),
    //         attempts: cat.attempts,
    //       }))

    //       return { data: comparison }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: ['ExamAttemptView'],
    // }),
  }),
})

export const {
  // useGetExamAttemptsQuery,
  // useGetExamAttemptByIdQuery,
  // useUpdateExamAttemptMutation,
  useDeleteExamAttemptMutation,
  // useGetSubjectResultsQuery,
  // useCreateSubjectResultMutation,
  // useUpdateSubjectResultMutation,
  useCreateExamAttemptWithResultsMutation,
  // useUpdateExamAttemptWithResultsMutation,
  useGetExamAttemptViewsQuery,
} = examApi
