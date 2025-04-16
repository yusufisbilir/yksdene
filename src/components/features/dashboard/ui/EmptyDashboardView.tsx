import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import { BarChart2, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function EmptyDashboardView() {
  return (
    <Card className="container p-2 sm:p-8 space-y-1 sm:space-y-8 text-center border-dashed border-primary/50">
      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
        🚀 Başarıya Giden Yolda İlk Adım!
      </h1>

      <Card className="shadow-lg bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-3 sm:text-2xl text-xl font-semibold">
            <BarChart2 className="w-7 h-7 text-primary hidden sm:block" />
            Potansiyelini Keşfetmeye Hazır Mısın?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="max-w-xl mx-auto text-left sm:text-center text-lg text-muted-foreground">
            Harika bir başlangıç yaptın! 🎉 İlk deneme sonucunu ekleyerek gelişimini takip etmeye
            başla ve hedeflerine ne kadar yaklaştığını gör!
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={ROUTES.DENEME_EKLE}>
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
