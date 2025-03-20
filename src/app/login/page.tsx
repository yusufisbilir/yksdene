'use client'

import LoginGoogleButton from '@/components/login-google-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import UserCard from '@/components/user-card'
import { UserMenu } from '@/components/UserMenu'
import { useAppSelector } from '@/hooks/useRedux'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Ocak', net: 40 },
  { name: 'Şubat', net: 50 },
  { name: 'Mart', net: 80 },
  { name: 'Nisan', net: 95 },
]

export default function LoginPage() {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col gap-4">
        <Card className="w-full centered_card_container">
          <CardHeader>
            <CardTitle>YKS Dene'ye Hoş Geldiniz</CardTitle>
            <CardDescription>
              Net takibi ve tüm özelliklere erişmek için giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            {user ? <UserCard /> : <LoginGoogleButton />}
          </CardContent>
        </Card>

        <Card className="w-full centered_card_container">
          <CardHeader>
            <CardTitle>Özellikler</CardTitle>
            <CardDescription>
              🎉 YKS Dene ile YKS çalışmanızı daha eğlenceli hale getirin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="net" stroke="#FF6900" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Net Takibi</h3>
                <p className="text-sm text-muted-foreground">
                  Günlük, haftalık ve aylık net performansınızı takip edin. Detaylı grafikler ve
                  istatistiklerle gelişiminizi analiz edin.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Hedef Belirleme</h3>
                <p className="text-sm text-muted-foreground">
                  Net hedeflerinizi belirleyin ve ilerlemenizi takip edin. Hedeflerinize ulaşmak
                  için motivasyonunuzu artırın.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Performans Analizi</h3>
                <p className="text-sm text-muted-foreground">
                  Detaylı performans raporları ile güçlü ve zayıf yönlerinizi keşfedin. Gelişim
                  alanlarınızı belirleyin.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Sıralamalarda Yarış</h3>
                <p className="text-sm text-muted-foreground">
                  Günlük deneme sınavlarında yarışın ve sıralamalarınızı görün.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Gerçek YKS Saati İle Süreni Hesapla</h3>
                <p className="text-sm text-muted-foreground">
                  Gerçek sınavda duvar saatine bakarak kalan süreni hesaplayacaksın. Havalı
                  kronometreler veya pomodoro uygulamaları yok.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
