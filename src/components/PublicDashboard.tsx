'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

        <Card>
          <CardHeader>
            <CardTitle>Giriş Yapın</CardTitle>
            <CardDescription>Tüm özelliklere erişmek için giriş yapmalısın.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-6">
            <SignInButton>
              <Button className="w-full">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Giriş Yap</span>
                </div>
              </Button>
            </SignInButton>

            <div className="text-sm text-muted-foreground">
              Giriş yaparak net takibi, performans analizi ve daha fazla özelliğe erişebilirsiniz.
            </div>
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
