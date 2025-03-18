'use client'

import { useEffect, useState } from 'react'
import {
  useGetExamTemplatesQuery,
  useGetExamResultsQuery,
  useCreateExamAttemptWithResultsMutation,
  useGetSubjectsQuery,
} from '@/store/services/examApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SubjectResultInsert } from '@/types/db.types'
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from '@/components/ui/select'

interface SubjectResultForm {
  subject_id: string
  correct_count: number
  incorrect_count: number
}

export default function NetTakipPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>()
  const [examName, setExamName] = useState('')
  const [isAddingExam, setIsAddingExam] = useState(false)
  const [showSubjectResults, setShowSubjectResults] = useState(false)
  const [subjectResults, setSubjectResults] = useState<SubjectResultForm[]>([])
  const [examDate, setExamDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const { data: examTemplates, isLoading: isLoadingTemplates } = useGetExamTemplatesQuery()
  const { data: examResults, isLoading: isLoadingResults } = useGetExamResultsQuery()
  const { data: subjects } = useGetSubjectsQuery(selectedTemplate || '', {
    skip: !selectedTemplate,
  })
  const [createExamAttemptWithResults] = useCreateExamAttemptWithResultsMutation()

  const handleSubjectResultChange = (
    subjectId: string,
    field: 'correct_count' | 'incorrect_count',
    value: number,
  ) => {
    setSubjectResults((prev) => {
      const existingSubject = prev.find((s) => s.subject_id === subjectId)
      if (!existingSubject) {
        return [...prev, { subject_id: subjectId, correct_count: 0, incorrect_count: 0 }]
      }
      return prev.map((subject) =>
        subject.subject_id === subjectId
          ? {
              ...subject,
              [field]: Math.min(
                Math.max(0, value),
                subjects?.find((s) => s.id === subjectId)?.question_count || 0,
              ),
            }
          : subject,
      )
    })
  }

  const getTotalStats = () => {
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

  const handleAddExam = async () => {
    if (!examName || !selectedTemplate) return

    try {
      await createExamAttemptWithResults({
        examAttempt: {
          name: examName,
          date: examDate,
          exam_template_id: selectedTemplate,
        },
        subjectResults: subjectResults,
      }).unwrap()

      // Reset form
      setExamName('')
      setSubjectResults([])
      setExamDate(format(new Date(), 'yyyy-MM-dd'))
      setIsAddingExam(false)
    } catch (error) {
      console.error('Failed to save exam results:', error)
    }
  }

  useEffect(() => {
    console.log('examTemplates:', examTemplates)
  }, [examTemplates])

  if (isLoadingTemplates || isLoadingResults) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl w-full mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Net Takip</h1>
        <Button onClick={() => setIsAddingExam(!isAddingExam)}>
          {isAddingExam ? 'İptal' : 'Yeni Deneme Ekle'}
        </Button>
      </div>

      {/* Add exam form */}
      {isAddingExam && (
        <Card>
          <CardHeader>
            <CardTitle>Yeni Deneme Ekle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Deneme Türü</Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={(value) => setSelectedTemplate(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTemplates?.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Başlık</Label>
                <Input
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="Deneme adını girin"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Tarih</Label>
                <Input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {selectedTemplate && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Sonuçlar</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {getTotalStats().correct} Doğru
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getTotalStats().incorrect} Yanlış
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getTotalStats().blank} Boş
                    </span>
                    <span className="text-sm font-medium">
                      {getTotalStats().net.toFixed(2)} Net
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {subjects?.map((subject) => {
                    const result = subjectResults.find((r) => r.subject_id === subject.id)
                    return (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>{subject.name}</Label>
                          <span className="text-sm text-muted-foreground ml-auto">
                            {subject.question_count} Soru
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Input
                              type="number"
                              min="0"
                              max={subject.question_count}
                              value={result?.correct_count || 0}
                              onChange={(e) =>
                                handleSubjectResultChange(
                                  subject.id,
                                  'correct_count',
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              placeholder="Doğru"
                              className="w-full"
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              min="0"
                              max={subject.question_count}
                              value={result?.incorrect_count || 0}
                              onChange={(e) =>
                                handleSubjectResultChange(
                                  subject.id,
                                  'incorrect_count',
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              placeholder="Yanlış"
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <Button
              onClick={handleAddExam}
              className="w-full"
              disabled={!selectedTemplate || !examName}
            >
              Kaydet
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Exam results list */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examResults?.map((result) => (
          <Card key={result.exam_attempt_id}>
            <CardHeader>
              <CardTitle className="text-lg">{result.exam_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tarih:</span>
                  <span>{format(new Date(result.date!), 'dd MMMM yyyy', { locale: tr })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doğru:</span>
                  <span className="text-green-600">{result.correct_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yanlış:</span>
                  <span className="text-red-600">{result.incorrect_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Boş:</span>
                  <span className="text-yellow-600">{result.blank_count}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Net:</span>
                  <span className={result.net_score! >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {result.net_score?.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  )
}
