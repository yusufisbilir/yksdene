'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCreatePaymentMutation } from '@/features/payment.slice'
import { useGetProfileQuery } from '@/features/profile.slice'
import { useAuth } from '@clerk/nextjs'
import { Check, CreditCard, Shield, Star, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function OdemePage() {
  const { userId } = useAuth()
  const [loading, setLoading] = useState(false)
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery()
  const [createPayment] = useCreatePaymentMutation()

  const handlePayment = async () => {
    if (!userId) {
      alert('Ödeme yapmak için giriş yapmalısınız.')
      return
    }

    setLoading(true)

    try {
      const response = await createPayment({
        amount: 99,
        userEmail: profile?.email ?? '',
        userName: profile?.name ?? '',
        userPhone: '5555555555',
        userAddress: 'Turkiye',
      }).unwrap()

      if (response.status === 'success') {
        // PayTR ödeme sayfasına yönlendir
        window.location.href = response.iframe_url!
      } else {
        alert('Ödeme işlemi başlatılırken bir hata oluştu: ' + response.message)
      }
    } catch (error: any) {
      console.error('Ödeme hatası:', error)
      const errorMessage = error.data?.message || error.message || 'Bilinmeyen bir hata oluştu'
      alert('Ödeme işlemi sırasında bir hata oluştu: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (isProfileLoading) {
    return (
      <div className="container mx-auto py-12 max-w-5xl px-4 sm:px-6 bg-gradient-to-b from-orange-50/50 to-transparent rounded-3xl">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 text-orange-500 animate-spin mb-4" />
          <p className="text-gray-600">Profil bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (profile?.is_paid) {
    return (
      <div className="container mx-auto py-12 max-w-5xl px-4 sm:px-6 bg-gradient-to-b from-orange-50/50 to-transparent rounded-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center">YKS Dene Premium Üyelik</h1>
        <Card className="overflow-hidden border-0 shadow-md max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-green-400 p-6">
            <h2 className="text-xl font-semibold text-white">Premium Hesap</h2>
          </div>
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-3">Ödeme Yapıldı</h3>
            <p className="text-gray-600 mb-6">
              Premium hesaba başarıyla abone oldunuz. Tüm özel içeriklere erişebilirsiniz.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  if (profile?.is_premium) {
    return (
      <div className="container mx-auto py-12 max-w-5xl px-4 sm:px-6 bg-gradient-to-b from-orange-50/50 to-transparent rounded-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center">YKS Dene Premium Üyelik</h1>
        <Card className="overflow-hidden border-0 shadow-md max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-6">
            <h2 className="text-xl font-semibold text-white">Ücretsiz Premium Hesap</h2>
          </div>
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">Ücretsiz Premium Hesap</h3>
            <p className="text-gray-600 mb-6">
              Ücretsiz premium hesaba sahipsiniz. Tüm özel içeriklere erişebilirsiniz.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 max-w-5xl px-4 sm:px-6 bg-gradient-to-b from-orange-50/50 to-transparent rounded-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">YKS Dene Premium Üyelik</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <Card className="h-full overflow-hidden border-0 shadow-md">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6">
              <h2 className="text-xl font-semibold text-white">Ürün Bilgileri</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-orange-500">YKS Dene Lifetime Üyelik</h3>
                <p className="text-gray-600 mt-2">
                  YKS Dene platformumuza ömür boyu erişim sağlayan premium üyelik paketidir. Tüm YKS
                  hazırlık içeriklerine, deneme sınavlarına ve özel kaynaklara sınırsız
                  erişebilirsiniz.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-orange-500">Paket İçeriği</h3>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-gray-600">Limitsiz deneme ekleme</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-gray-600">Performans analizi</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-gray-600">Günlük Denemeler</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-gray-600">Tek seferlik ödeme</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-gray-600">Yeni özelliklerin tamamına erişim</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 line-through">₺399</span>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                    %75 İndirim
                  </span>
                </div>
                <div className="text-3xl font-bold text-orange-500">₺99</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-5">
          <Card className="h-full overflow-hidden border-0 shadow-md">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6">
              <h2 className="text-xl font-semibold text-white">Ödeme</h2>
            </div>

            <div className="p-6 flex flex-col justify-between h-[calc(100%-76px)]">
              <div>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                    <CreditCard className="h-10 w-10 text-orange-500" />
                  </div>
                </div>

                <p className="text-center text-gray-600 mb-6">
                  PayTR güvenli ödeme sayfasına yönlendirileceksiniz.
                </p>

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full h-12 text-base font-medium bg-orange-500 hover:bg-orange-600"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>İşleniyor...</span>
                    </div>
                  ) : (
                    'Şimdi Satın Al'
                  )}
                </Button>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                  <Shield className="h-4 w-4 text-orange-400" />
                  <p>Ödeme işleminiz PayTR güvencesiyle gerçekleştirilecektir.</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-center mb-2 text-gray-700">Güvenli Ödeme</h3>
                  <p className="text-xs text-center text-gray-500">
                    Visa, Mastercard ve tüm banka kartları ile güvenli ödeme yapabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
