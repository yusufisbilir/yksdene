'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart2, BookPlus } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export function EmptyDashboard() {
  return (
    <Card className="container p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Sınav Performans Paneli</h1>

      <Card className="bg-muted/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            Henüz deneme sonucu yok
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Sınav performans paneliniz şu anda boş görünüyor. Deneme sonuçlarınızı ekleyerek
            performans grafiklerinizi görüntüleyebilirsiniz.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={ROUTES.DENEMELERIM}>
              <Button className="flex items-center w-full gap-2 sm:w-auto">
                <BookPlus className="w-4 h-4" />
                Deneme Sonucu Ekle
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Card>
  )
}
