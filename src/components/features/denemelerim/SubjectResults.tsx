import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { Subject } from '@/types'
import { CreateExamAttemptInput } from '@/types'

interface SubjectResultsProps {
  form: UseFormReturn<CreateExamAttemptInput>
  subjects: Subject[]
}

export function SubjectResults({ form, subjects }: SubjectResultsProps) {
  return (
    <div className="gap-y-8 sm:gap-x-6 xl:gap-x-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {subjects.map((subject) => {
        const subjectIndex = form
          .getValues('subjectResults')
          .findIndex((s) => s.subject_id === subject.id)

        const correctCount = form.watch(`subjectResults.${subjectIndex}.correct_count`) ?? 0
        const incorrectCount = form.watch(`subjectResults.${subjectIndex}.incorrect_count`) ?? 0
        const remainingQuestions = subject.question_count - correctCount - incorrectCount

        return (
          <div key={subject.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{subject.name}</h3>
              <span className="text-xs text-gray-400 ml-auto">{subject.question_count} Soru</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`subjectResults.${subjectIndex}.correct_count`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-green-50 border-green-300"
                        type="number"
                        min="0"
                        max={subject.question_count - incorrectCount}
                        placeholder="Doğru"
                        value={field.value === 0 ? '0' : field.value || ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          // Boş girişi 0 olarak kabul et
                          const enteredValue =
                            e.target.value === '' ? 0 : parseInt(e.target.value) || 0
                          const maxAllowed = subject.question_count - incorrectCount
                          const value = Math.min(Math.max(0, enteredValue), maxAllowed)

                          if (enteredValue > maxAllowed) {
                            // Bildirim yerine direkt max değeri uygulayarak düzeltiyoruz
                            e.target.value = value.toString()
                          }

                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`subjectResults.${subjectIndex}.incorrect_count`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-red-50 border-red-300"
                        type="number"
                        min="0"
                        max={subject.question_count - correctCount}
                        placeholder="Yanlış"
                        value={field.value === 0 ? '0' : field.value || ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          // Boş girişi 0 olarak kabul et
                          const enteredValue =
                            e.target.value === '' ? 0 : parseInt(e.target.value) || 0
                          const maxAllowed = subject.question_count - correctCount
                          const value = Math.min(Math.max(0, enteredValue), maxAllowed)

                          if (enteredValue > maxAllowed) {
                            // Bildirim yerine direkt max değeri uygulayarak düzeltiyoruz
                            e.target.value = value.toString()
                          }

                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-xs text-gray-500 mt-1">
              <span>Kalan: {remainingQuestions} soru</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
