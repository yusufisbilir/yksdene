import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignInButton } from '@clerk/nextjs'
import { BarChart2, Clock, TargetIcon, TrendingUp, User, Users, CheckCircle } from 'lucide-react'

const features = [
  {
    title: 'Net Takibi',
    description:
      'Günlük, haftalık ve aylık net performansınızı takip edin. Detaylı grafikler ve istatistiklerle gelişiminizi analiz edin.',
    icon: <BarChart2 className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Hedef Belirleme',
    description:
      'Net hedeflerinizi belirleyin ve ilerlemenizi takip edin. Hedeflerinize ulaşmak için motivasyonunuzu artırın.',
    icon: <TargetIcon className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Performans Analizi',
    description:
      'Detaylı performans raporları ile güçlü ve zayıf yönlerinizi keşfedin. Gelişim alanlarınızı belirleyin.',
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Gerçek Sıralama Takibi',
    description: 'Net sonuçlarınıza göre gerçek sıralama ve puanınızı takip edin.',
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Sıralamalarda Yarış',
    description: 'Günlük deneme sınavlarında yarışın ve sıralamalarınızı görün.',
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: 'ÖSYM Saati',
    description:
      'Gerçek sınavda duvar saatine bakarak kalan süreni hesaplayacaksın. Havalı kronometreler veya pomodoro uygulamaları yok.',
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
]

export default function PublicDashboardView() {
  return (
    <section className="space-y-6 panel">
      <div className="w-full p-4 mb-4 text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
          <span className="font-bold">🎉 Sınırlı bir süre için ÖZEL!</span>
          <span>
            Premium hesap tamamen <span className="font-bold underline">ÜCRETSİZ</span>
          </span>
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Hoş Geldin! 🎉</h1>
        <p className="text-muted-foreground">
          Gerçekçi şekilde denemeler çöz. Netlerini kaydet. Gelişiminle fark yarat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="relative overflow-hidden transition-all duration-300 border-2 shadow-lg border-primary/20 group hover:border-primary/30 hover:shadow-xl bg-card">
          <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-primary/5 to-primary/10"></div>
          <div className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-primary/10 blur-3xl"></div>
          <div className="absolute w-40 h-40 rounded-full -bottom-20 -left-20 bg-primary/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
            <div className="p-4 mb-6 transition-all duration-300 rounded-full bg-primary/10 ring-4 ring-primary/5 group-hover:ring-primary/10">
              <User className="w-16 h-16 text-primary" />
            </div>

            <h2 className="mb-2 text-2xl font-bold tracking-tight">Başarı Yolculuğun Başlıyor!</h2>
            <p className="max-w-md mb-8 text-muted-foreground">
              Tüm özelliklere erişmek ve tam potansiyelini açığa çıkarmak için hemen giriş yap.
            </p>

            <div className="grid w-full max-w-xs gap-4">
              <SignInButton>
                <Button className="w-full bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] hover:brightness-110 transition-all duration-300 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transform">
                  <div className="flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Giriş Yap</span>
                  </div>
                </Button>
              </SignInButton>
            </div>

            <div className="grid w-full grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center p-3 transition-colors duration-200 rounded-lg hover:bg-primary/5">
                <TargetIcon className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs font-medium">Hedefler</span>
              </div>
              <div className="flex flex-col items-center p-3 transition-colors duration-200 rounded-lg hover:bg-primary/5">
                <TrendingUp className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs font-medium">Analiz</span>
              </div>
              <div className="flex flex-col items-center p-3 transition-colors duration-200 rounded-lg hover:bg-primary/5">
                <Users className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs font-medium">Topluluk</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center mt-6 text-xs text-muted-foreground">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                <span>Tamamen ücretsiz</span>
              </div>
              <div className="flex items-center mt-6 text-xs text-muted-foreground">
                <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
                <span>Clerk ve Google ile güvenli</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 p-6">
              {feature.icon}
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
