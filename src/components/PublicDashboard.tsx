'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignInButton } from '@clerk/nextjs'
import { BarChart2, Clock, TargetIcon, TrendingUp, User, Users } from 'lucide-react'
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
        <h1 className="text-3xl font-bold tracking-tight">Sınav Performans Paneli</h1>
        <p className="text-muted-foreground">
          Deneme sınavlarınızı takip edin, performansınızı analiz edin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="p-6 pb-0">
            <CardTitle>Örnek Net Grafik</CardTitle>
            <CardDescription>Netlerinizi takip edip, gelişiminizi görün</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-6">
            <CardTitle>Giriş Yapın</CardTitle>
            <CardDescription>Tüm özelliklere erişmek için hesabınıza giriş yapın.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col p-6 space-y-6">
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
