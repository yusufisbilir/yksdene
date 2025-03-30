'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignInButton } from '@clerk/nextjs'
import { BarChart2, Clock, TargetIcon, TrendingUp, User, Users, CheckCircle } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { name: 'Ocak', net: 40 },
  { name: 'Şubat', net: 50 },
  { name: 'Mart', net: 80 },
  { name: 'Nisan', net: 95 },
]

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

const PublicDashboard = () => {
  return (
    <section className="space-y-6 panel">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiiiin! 🎉</h1>
        <p className="text-muted-foreground">
          Gerçekçi şekilde denemeler çöz. Netlerini kaydet. Gelişiminle fark yarat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
        <Card className="overflow-hidden">
          <CardHeader className="p-6 pb-0">
            <CardTitle>Gelecek özellikler</CardTitle>
            <CardDescription>Kahveni yudumla ve gelişimini seyret. ☕️</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span>Deneme netlerinle gerçek sıralamanı öğren</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span>Girmek istediğin bölümü seçip hayallerine ne kadar yaklaştığını izle</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span>Günlük denemelere kayıt ol ve sıralamalarda yarış</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span>Başarı tablosunda yerini al</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span>Sınav profili oluştur</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span>Diğer sınav öğrencileriyle sosyalleş</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span>Birlikte sınav odaklı bir sosyal medya olmayalım mı?</span>
              </li>
            </ul>
          </CardContent>
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

export default PublicDashboard
