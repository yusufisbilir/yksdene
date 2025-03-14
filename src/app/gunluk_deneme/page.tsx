'use client'

import ExamSelect from '@/components/examPractice/ExamSelect'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import getExamStartEndTimes from '@/utils/getExamStartEndTimes'
import useDailyExamTimer from '@/hooks/useDailyExamTimer'
import { useTimer } from '@/contexts/TimerContext'
import AnalogClock from '@/components/shared/AnalogClock'
import getExamDuration from '@/utils/getExamDuration'
import ExamInfo from '@/components/dailyExamPractice/ExamInfo'

const Page = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { state: timer } = useTimer()
  const [isVisibleDailyExamPractice, setIsVisibleDailyExamPractice] = useLocalStorage(
    'isVisibleDailyExamPractice',
    true,
  )
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const { clockRotations } = useDailyExamTimer({
    startDate: startDate,
    endDate: endDate,
  })

  useEffect(() => {
    setIsMounted(true)
    const [startHours, startMinutes] = getExamStartEndTimes(timer.selectedExam)
      .start.split(':')
      .map(Number)
    const startDate = new Date()
    startDate.setHours(startHours, startMinutes, 0, 0)
    setStartDate(startDate)

    const [endHours, endMinutes] = getExamStartEndTimes(timer.selectedExam)
      .end.split(':')
      .map(Number)
    const endDate = new Date()
    endDate.setHours(endHours, endMinutes, 0, 0)
    setEndDate(endDate)
  }, [timer.selectedExam])

  if (!isMounted) {
    return null
  }

  return (
    <section className="flex flex-col gap-y-2 my-4">
      {isVisibleDailyExamPractice && (
        <div className="centered_card_container gap-y-2">
          <h1 className="font-semibold">Gerçek Sınav Deneyimi</h1>
          <p>Her sabah 10:15&apos;te başlar. Başarılar dilerim ❤️</p>
          <Button
            className="max-w-fit self-end"
            onClick={() => setIsVisibleDailyExamPractice(false)}
          >
            Anladım Hocam, Hallederiz
          </Button>
        </div>
      )}
      <div className="centered_card_container z-40">
        <ExamSelect />
        <AnalogClock clockRotations={clockRotations} />
        <ExamInfo selectedExam={timer.selectedExam} />
      </div>
    </section>
  )
}

export default Page
