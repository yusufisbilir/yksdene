import { ProfilesUniversityProgramView } from '@/types'
import {
  Album,
  BookCheck,
  CircleCheckBig,
  Crosshair,
  GraduationCapIcon,
  Landmark,
  UserIcon,
  Users,
  Edit,
  CircleDashed,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

type DashboardProfileViewProps = {
  profileWithUniversityProgram: ProfilesUniversityProgramView
  lastRanking: number | null
  lastScore: number | null
  isSuccess: boolean
}

export default function DashboardProfileView({
  profileWithUniversityProgram,
  lastRanking,
  lastScore,
  isSuccess,
}: DashboardProfileViewProps) {
  const profile = profileWithUniversityProgram

  return (
    <div className="flex flex-col gap-4 p-6 bg-white border-2 shadow-lg rounded-xl dark:bg-gray-800/60 border-primary/10">
      {/* Profile Header - Top Section with Photo and User Info */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* User Avatar and Name Section */}
        <div className="flex items-center gap-4">
          {/* Profile Photo with Graduation Badge */}
          <div className="relative flex-shrink-0">
            <div className="overflow-hidden border-4 rounded-full shadow-lg w-28 h-28 md:w-32 md:h-32 border-primary/20">
              {profile.image_url ? (
                <Image
                  src={profile.image_url || ''}
                  alt={profile.name || 'Profile'}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800">
                  <UserIcon className="w-12 h-12 text-primary/60" />
                </div>
              )}
            </div>
          </div>

          {/* User Name and Username */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-indigo-600 md:text-2xl dark:text-indigo-400">
              {profile?.name || 'Unnamed Student'}
            </h1>

            {profile.username && (
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
            )}
          </div>
        </div>

        {/* Stats Section - Rankings and Scores */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Last Ranking */}
          <div className="flex items-center gap-3 p-3 border border-purple-100 rounded-lg shadow-sm bg-purple-50 dark:bg-purple-950/30 dark:border-purple-900">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <span className="text-sm text-muted-foreground">Son Sıralama</span>
              <p className="font-semibold">{lastRanking?.toLocaleString()}</p>
            </div>
          </div>

          {/* Last Score */}
          <div className="flex items-center gap-3 p-3 border border-purple-100 rounded-lg shadow-sm bg-purple-50 dark:bg-purple-950/30 dark:border-purple-900">
            <BookCheck className="w-5 h-5 text-purple-600" />
            <div>
              <span className="text-xs text-muted-foreground">Son Puan</span>
              <p className="text-lg font-semibold">{lastScore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details - University, Department, and Feedback */}
      <div className="flex flex-col flex-grow gap-4 text-left">
        {/* University and Department Information */}
        <div className="grid grid-cols-1 gap-3">
          {/* University, Department and Target Field */}
          <div className="relative p-4 border border-orange-100 rounded-lg bg-orange-50 dark:bg-orange-950/30 dark:border-orange-900">
            {/* Field Badge - Top Right */}
            <div className="absolute px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-full shadow-sm -top-2 right-3 dark:bg-blue-800/40 dark:text-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-1">
                <Album className="w-3 h-3" />
                <span>{profile.category}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Landmark className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="flex flex-col w-full gap-2">
                <span className="text-xs text-muted-foreground">Üniversite</span>
                <p className="text-sm sm:text-xl font-semibold">{profile?.university}</p>

                {/* Department Info */}
                <p className="text-sm sm:text-lg font-medium">{profile?.program}</p>
                {/* Required Score and Ranking */}
                <div className="flex items-center sm:self-end gap-2">
                  <Crosshair className="w-5 text-orange-600" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm sm:text-base text-muted-foreground">{`${profile?.rank?.toLocaleString()} sıralama`}</p>
                    <p className="text-sm sm:text-base text-muted-foreground">{`${profile.score} puan`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback and Motivational Messages */}
        <div className="grid grid-cols-1 gap-3 mt-2">
          {isSuccess ? (
            <div className="flex items-center gap-2 p-3 border border-green-100 rounded-lg bg-green-50/50 dark:bg-green-950/20 dark:border-green-900/50">
              <CircleCheckBig className="flex-shrink-0 w-5 h-5 text-green-600" />

              <p className="text-sm italic text-green-800 dark:text-green-300">
                "Tebrikler! Netlerin bu bölüm için yeterli görünüyor. Azmini koru, hedefin çok
                yakın!"
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 border border-red-100 rounded-lg bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/50">
              <CircleDashed className="flex-shrink-0 w-5 h-5 text-red-600" />

              <p className="text-sm italic text-red-800 dark:text-red-300">
                "Şu an netlerin yeterli değil ama unutma, başarı sabırla gelir. Devam et!"
              </p>
            </div>
          )}
        </div>
        {/* Edit Targets Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Link href={ROUTES.DENEME_EKLE} className="order-2 sm:order-1">
            <Button
              size="sm"
              className="flex items-center gap-1 text-xs shadow-sm w-full sm:w-auto"
            >
              + Deneme Ekle
            </Button>
          </Link>
          <Link href={ROUTES.PROFILE_TARGETS}>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-xs shadow-sm w-full sm:w-auto"
            >
              <Edit className="w-3 h-3" />
              Üniversite Hedefini Düzenle
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
