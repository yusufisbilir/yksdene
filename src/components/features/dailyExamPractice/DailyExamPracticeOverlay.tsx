'use client'

import useTime from '@/hooks/useTime'

const DailyExamPracticeOverlay = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const time = useTime()
  const isBeforeExam = time < startDate
  const isAfterExam = time > endDate

  if (!isBeforeExam && !isAfterExam) return null

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-50 backdrop-blur-sm rounded-xl">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <h2 className="text-4xl font-bold text-black">
          {isBeforeExam ? 'Denemeye Hazırlan' : 'Tebrikler!'}
        </h2>
        <p className="text-xl text-black">
          {isBeforeExam
            ? `Deneme ${startDate?.getHours()}:${startDate.getMinutes()}'de başlayacak`
            : 'Bu Günkü Deneme Tamamlandı'}
        </p>
      </div>
    </div>
  )
}

export default DailyExamPracticeOverlay
