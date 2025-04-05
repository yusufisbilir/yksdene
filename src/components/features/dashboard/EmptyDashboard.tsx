import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart2, BookPlus, Rocket } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export function EmptyDashboard() {
  return (
    <Card className="container p-8 space-y-8 text-center border-dashed border-primary/50">
      <h1 className="text-4xl font-extrabold tracking-tight text-primary">
        🚀 Başarıya Giden Yolda İlk Adım!
      </h1>

      <Card className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-3 text-2xl font-semibold">
            <BarChart2 className="w-7 h-7 text-primary" />
            Potansiyelini Keşfetmeye Hazır Mısın?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Harika bir başlangıç yaptın! 🎉 Başarı tablon şu an boş, ama endişelenme. İlk deneme
            sonucunu ekleyerek gelişimini takip etmeye başla ve hedeflerine ne kadar yaklaştığını
            gör!
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={ROUTES.DENEMELERIM}>
              <Button size="lg" className="flex items-center w-full gap-2 sm:w-auto">
                <Rocket className="w-5 h-5" />
                İlk Deneme Sonucumu Ekle!
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Card>
  )
}
