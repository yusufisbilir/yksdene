import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from '@/components/ui/select'
import { UseFormReturn } from 'react-hook-form'
import { SubjectResults } from './subject-results'
import { TotalStats } from './total-stats'
import { ExamFormValues, ExamTemplate, Subject } from './types'

interface AddExamFormProps {
  form: UseFormReturn<ExamFormValues>
  examTemplates: ExamTemplate[]
  subjects: Subject[]
  onSubmit: (data: ExamFormValues) => Promise<void>
}

export function AddExamForm({ form, examTemplates, subjects, onSubmit }: AddExamFormProps) {
  const getTotalStats = () => {
    const subjectResults = form.watch('subjectResults')
    return subjectResults.reduce(
      (acc, subject) => {
        const subjectTemplate = subjects?.find((s) => s.id === subject.subject_id)
        const questionCount = subjectTemplate?.question_count || 0
        return {
          correct: acc.correct + subject.correct_count,
          incorrect: acc.incorrect + subject.incorrect_count,
          blank: acc.blank + (questionCount - subject.correct_count - subject.incorrect_count),
          net: acc.net + (subject.correct_count - subject.incorrect_count * 0.25),
        }
      },
      { correct: 0, incorrect: 0, blank: 0, net: 0 },
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yeni Deneme Ekle</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="examTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deneme Türü</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {examTemplates?.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input placeholder="Deneme adını girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarih</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.getValues('examTemplate') && subjects && (
              <div className="space-y-4">
                <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
                  <h3 className="font-semibold">Sonuçlar</h3>
                  <TotalStats {...getTotalStats()} />
                </div>
                <SubjectResults form={form} subjects={subjects} />
              </div>
            )}

            <Button type="submit" className="w-full">
              Kaydet
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
