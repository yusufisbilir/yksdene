'use client'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import DeleteExamAttemptButton from './DeleteExamAttemptButton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileSpreadsheet } from 'lucide-react'
import { useGetExamAttemptViewQuery } from '@/features/exam_attempt_view.slice'
import PageLoader from '@/components/shared/PageLoader'

export function ExamResultsList() {
  const {
    data: results,
    isLoading: isLoadingExamAttemptViews,
    isFetching,
  } = useGetExamAttemptViewQuery()

  if (isLoadingExamAttemptViews || isFetching) {
    return <PageLoader />
  }

  if (results?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg bg-muted/10 min-h-[200px]">
        <FileSpreadsheet className="w-12 h-12 mb-4 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-medium">İlk Sınav Sonucunu ekle</h3>
        <p className="text-muted-foreground">
          "Deneme Ekle" butonuna tıkla. Bakalım kaç net çektin. 😎
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden overflow-hidden border rounded-md lg:block">
        <Table>
          <TableCaption>Toplam {results?.length} deneme sonucu</TableCaption>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[250px]">Deneme Adı</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="text-center">Doğru</TableHead>
              <TableHead className="text-center">Yanlış</TableHead>
              <TableHead className="text-center">Boş</TableHead>
              <TableHead className="text-center">Net</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results?.map((result) => (
              <TableRow
                key={result.attempt_id || ''}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  {result.attempt_name || 'İsimsiz Deneme'}
                </TableCell>
                <TableCell>
                  {result.attempt_date && (
                    <span>
                      {format(new Date(result.attempt_date), 'dd MMMM yyyy', { locale: tr })}
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-medium text-center text-green-600">
                  + {result.total_correct || 0}
                </TableCell>
                <TableCell className="font-medium text-center text-red-600">
                  - {result.total_incorrect || 0}
                </TableCell>
                <TableCell className="font-medium text-center text-amber-500">
                  {result.total_blank || 0}
                </TableCell>
                <TableCell className={`text-center text-lg font-medium`}>
                  {(result.net_score || 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  {result.attempt_id && <DeleteExamAttemptButton attempt_id={result.attempt_id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 lg:hidden md:grid-cols-2">
        {results?.map((result) => (
          <Card key={result.attempt_id || ''} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{result.attempt_name || 'İsimsiz Deneme'}</CardTitle>
              {result.attempt_id && <DeleteExamAttemptButton attempt_id={result.attempt_id} />}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tarih:</span>
                  {result.attempt_date && (
                    <span className="text-sm font-medium">
                      {format(new Date(result.attempt_date), 'dd MMMM yyyy', { locale: tr })}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 py-2">
                  <div className="flex flex-col items-center p-2 rounded-md bg-green-50">
                    <span className="text-xs text-muted-foreground">Doğru</span>
                    <span className="text-lg font-semibold text-green-600">
                      +{result.total_correct || 0}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-red-50">
                    <span className="text-xs text-muted-foreground">Yanlış</span>
                    <span className="text-lg font-semibold text-red-600">
                      -{result.total_incorrect || 0}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-amber-50">
                    <span className="text-xs text-muted-foreground">Boş</span>
                    <span className="text-lg font-semibold text-amber-500">
                      {result.total_blank || 0}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-medium">NET:</span>
                  <span className={`text-xl font-bold`}>{(result.net_score || 0).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
