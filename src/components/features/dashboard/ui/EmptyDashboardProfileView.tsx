import { Landmark, GraduationCapIcon, Crosshair, BookCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export default function EmptyDashboardProfileView() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white border-2 shadow-lg rounded-xl dark:bg-gray-800/60 border-primary/10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Henüz bir hedef belirlemediniz!
        </h2>
        <p className="text-muted-foreground">
          YKS hazırlığında hedeflerini belirlemek, motivasyonunu ve başarı şansını artırır.
        </p>
      </div>

      {/* Empty State Illustration */}
      <div className="flex justify-center p-6 my-2 border border-dashed rounded-lg border-primary/20">
        <div className="flex flex-col items-center justify-center max-w-md gap-4 text-center">
          <GraduationCapIcon className="w-16 h-16 text-primary/30" />
          <h3 className="text-xl font-semibold">Hayalindeki üniversiteyi belirle</h3>
          <p className="text-sm text-muted-foreground">
            Hedefini belirleyerek güncel netlerine göre nerede olduğunu görebilirsin.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900">
          <Landmark className="w-8 h-8 text-orange-600" />
          <h4 className="font-medium">Üniversite Seç</h4>
          <p className="text-xs text-center text-muted-foreground">
            Hayalindeki üniversiteyi belirle ve ona göre çalış
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900">
          <BookCheck className="w-8 h-8 text-purple-600" />
          <h4 className="font-medium">İlerlemeyi Takip Et</h4>
          <p className="text-xs text-center text-muted-foreground">
            Netlerini girerek hedefe olan uzaklığını görüntüle
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900">
          <Crosshair className="w-8 h-8 text-blue-600" />
          <h4 className="font-medium">Motivasyonunu Artır</h4>
          <p className="text-xs text-center text-muted-foreground">
            Hedefine yaklaştıkça motivasyonunu yüksek tut
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center mt-2 items-center gap-4">
        <span className="text-2xl">👉🏻</span>
        <Link href={ROUTES.PROFILE_TARGETS}>
          <Button size="lg" className="flex items-center gap-2 shadow-md">
            Üniversite Hedefini Düzenlemek İçin Tıklayın
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <span className="text-2xl">👈🏻</span>
      </div>
    </div>
  )
}
