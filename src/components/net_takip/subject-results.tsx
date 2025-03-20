import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { ExamFormValues, Subject } from './types'

interface SubjectResultsProps {
  form: UseFormReturn<ExamFormValues>
  subjects: Subject[]
}

export function SubjectResults({ form, subjects }: SubjectResultsProps) {
  return (
    <div className="space-y-4">
      {subjects.map((subject) => {
        const subjectIndex = form
          .getValues('subjectResults')
          .findIndex((s) => s.subject_id === subject.id)

        return (
          <div key={subject.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>{subject.name}</Label>
              <span className="text-sm text-muted-foreground ml-auto">
                {subject.question_count} Soru
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`subjectResults.${subjectIndex}.correct_count`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max={subject.question_count}
                        placeholder="Doğru"
                        value={field.value || ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const value =
                            e.target.value === ''
                              ? 0
                              : Math.min(
                                  Math.max(0, parseInt(e.target.value) || 0),
                                  subject.question_count,
                                )
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
                        type="number"
                        min="0"
                        max={subject.question_count}
                        placeholder="Yanlış"
                        value={field.value || ''}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const value =
                            e.target.value === ''
                              ? 0
                              : Math.min(
                                  Math.max(0, parseInt(e.target.value) || 0),
                                  subject.question_count,
                                )
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
