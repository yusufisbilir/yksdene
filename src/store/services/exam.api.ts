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
    // getExamAttempts: builder.query<ExamAttempt[], void>({
    //   queryFn: async () => {
    //     try {
    //       const supabase = await createClient()
    //       const { data, error } = await supabase
    //         .from('exam_attempts')
    //         .select('*, exam_templates(name, category)')
    //         .order('date', { ascending: false })

    //       if (error) throw error
    //       return { data }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: ['ExamAttempts'],
    // }),

    // getExamAttemptById: builder.query<ExamAttempt, string>({
    //   queryFn: async (id) => {
    //     try {
    //       const supabase = await createClient()
    //       const { data, error } = await supabase
    //         .from('exam_attempts')
    //         .select('*, exam_templates(name, category)')
    //         .eq('id', id)
    //         .single()

    //       if (error) throw error
    //       return { data }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: (result, error, id) => [{ type: 'ExamAttempts', id }],
    // }),

    // updateExamAttempt: builder.mutation<ExamAttempt, { id: string } & Partial<ExamAttemptInsert>>({
    //   queryFn: async ({ id, ...examAttempt }) => {
    //     try {
    //       const supabase = await createClient()
    //       const { data, error } = await supabase
    //         .from('exam_attempts')
    //         .update({ ...examAttempt, updated_at: new Date().toISOString() })
    //         .eq('id', id)
    //         .select()
    //         .single()

    //       if (error) throw error
    //       return { data }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   invalidatesTags: (result, error, { id }) => [{ type: 'ExamAttempts', id }, 'ExamAttemptView'],
    // }),

    // Subject Results
    // getSubjectResults: builder.query<SubjectResult[], string>({
    //   queryFn: async (examAttemptId) => {
    //     try {
    //       const supabase = await createClient()
    //       const { data, error } = await supabase
    //         .from('subject_results')
    //         .select('*, subjects(name, question_count)')
    //         .eq('exam_attempt_id', examAttemptId)

    //       if (error) throw error
    //       return { data }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: (result, error, examAttemptId) => [
    //     { type: 'SubjectResults', id: examAttemptId },
    //   ],
    // }),

    // createSubjectResult: builder.mutation<SubjectResult, SubjectResultInsert>({
    //   queryFn: async (subjectResult) => {
    //     try {
    //       const supabase = await createClient()
    //       const { data, error } = await supabase
    //         .from('subject_results')
    //         .insert(subjectResult)
    //         .select()
    //         .single()

    //       if (error) throw error
    //       return { data }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   invalidatesTags: (result, error, { exam_attempt_id }) => [
    //     { type: 'SubjectResults', id: exam_attempt_id?.toString() },
    //     'ExamAttemptView',
    //   ],
    // }),

    // updateSubjectResult: builder.mutation<
    //   SubjectResult,
    //   { id: string } & Partial<SubjectResultInsert>
    // >({
    //   queryFn: async ({ id, ...subjectResult }) => {
    //     try {
    //       const supabase = await createClient()
    //       const { data, error } = await supabase
    //         .from('subject_results')
    //         .update({ ...subjectResult, updated_at: new Date().toISOString() })
    //         .eq('id', id)
    //         .select()
    //         .single()

    //       if (error) throw error
    //       return { data }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: 'SubjectResults', id },
    //     'ExamAttemptView',
    //   ],
    // }),

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

    // Statistics and Analytics
    // getExamStatistics: builder.query<ExamStatistics, string>({
    //   queryFn: async (examTemplateId) => {
    //     try {
    //       const supabase = await createClient()
    //       const { data: results, error } = await supabase
    //         .from('exam_results_view')
    //         .select('*')
    //         .eq('exam_template_id', examTemplateId)

    //       if (error) throw error

    //       if (!results || results.length === 0) {
    //         return {
    //           data: {
    //             total_attempts: 0,
    //             average_net_score: 0,
    //             best_attempt: { exam_name: '', date: '', net_score: 0 },
    //             subject_performance: [],
    //           },
    //         }
    //       }

    //       // Process data to get statistics
    //       const totalAttempts = new Set(results.map((r) => r.exam_attempt_id)).size

    //       // Group by attempts
    //       const attemptGroups = results.reduce((acc, curr) => {
    //         if (!acc[curr.exam_attempt_id]) {
    //           acc[curr.exam_attempt_id] = {
    //             exam_name: curr.exam_name,
    //             date: curr.date,
    //             subjects: [],
    //           }
    //         }
    //         acc[curr.exam_attempt_id].subjects.push(curr)
    //         return acc
    //       }, {})

    //       // Calculate total net score per attempt
    //       const attemptNetScores = Object.values(attemptGroups).map((attempt: any) => {
    //         const totalNet = attempt.subjects.reduce((sum, subj) => sum + subj.net_score, 0)
    //         return {
    //           exam_name: attempt.exam_name,
    //           date: attempt.date,
    //           net_score: totalNet,
    //         }
    //       })

    //       // Find best attempt
    //       const bestAttempt = attemptNetScores.reduce(
    //         (best, current) => (current.net_score > best.net_score ? current : best),
    //         { exam_name: '', date: '', net_score: 0 },
    //       )

    //       // Calculate average net score
    //       const avgNetScore =
    //         totalAttempts > 0
    //           ? attemptNetScores.reduce((sum, curr) => sum + curr.net_score, 0) / totalAttempts
    //           : 0

    //       // Group by subject to calculate performance
    //       const subjectPerformance = results.reduce((acc, curr) => {
    //         if (!acc[curr.subject_name]) {
    //           acc[curr.subject_name] = {
    //             subject_name: curr.subject_name,
    //             net_scores: [],
    //             dates: [],
    //           }
    //         }
    //         acc[curr.subject_name].net_scores.push(curr.net_score)
    //         acc[curr.subject_name].dates.push(curr.date)
    //         return acc
    //       }, {})

    //       // Calculate average and trend for each subject
    //       const subjectStats = Object.values(subjectPerformance).map((subj: any) => {
    //         const avgNet =
    //           subj.net_scores.length > 0
    //             ? subj.net_scores.reduce((sum, score) => sum + score, 0) / subj.net_scores.length
    //             : 0

    //         // Trend calculation (comparing last 2 attempts if available)
    //         let trend: 'up' | 'down' | 'stable' = 'stable'
    //         if (subj.net_scores.length >= 2) {
    //           // Sort scores by date to ensure chronological comparison
    //           const scoresByDate = subj.net_scores
    //             .map((score, idx) => ({ score, date: new Date(subj.dates[idx]) }))
    //             .sort((a, b) => b.date.getTime() - a.date.getTime())

    //           const lastScore = scoresByDate[0].score
    //           const prevScore = scoresByDate[1].score

    //           if (lastScore > prevScore) trend = 'up'
    //           else if (lastScore < prevScore) trend = 'down'
    //         }

    //         return {
    //           subject_name: subj.subject_name,
    //           average_net_score: Number(avgNet.toFixed(2)),
    //           trend,
    //         }
    //       })

    //       return {
    //         data: {
    //           total_attempts: totalAttempts,
    //           average_net_score: Number(avgNetScore.toFixed(2)),
    //           best_attempt: {
    //             ...bestAttempt,
    //             net_score: Number(bestAttempt.net_score.toFixed(2)),
    //           },
    //           subject_performance: subjectStats,
    //         },
    //       }
    //     } catch (error) {
    //       return { error: handleError(error) }
    //     }
    //   },
    //   providesTags: (result, error, examTemplateId) => [
    //     { type: 'ExamAttemptView', id: examTemplateId },
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
