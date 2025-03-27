'use client'

import ExamSelect from '@/components/examPractice/ExamSelect'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import getExamStartEndTimes from '@/utils/getExamStartEndTimes'
import useDailyExamTimer from '@/hooks/useDailyExamTimer'
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import { start, pause, reset } from '@/store/slices/timer.slice'
import AnalogClock from '@/components/shared/AnalogClock'
import ExamInfo from '@/components/dailyExamPractice/ExamInfo'
import DailyExamPracticeOverlay from '@/components/dailyExamPractice/DailyExamPracticeOverlay'

const Page = () => {
  const [isMounted, setIsMounted] = useState(false)
  const timerState = useAppSelector((state) => state.timer)
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
    const [startHours, startMinutes] = getExamStartEndTimes(timerState.selectedExam)
      .start.split(':')
      .map(Number)
    const startDate = new Date()
    startDate.setHours(startHours, startMinutes, 0, 0)
    setStartDate(startDate)

    const [endHours, endMinutes] = getExamStartEndTimes(timerState.selectedExam)
      .end.split(':')
      .map(Number)
    const endDate = new Date()
    endDate.setHours(endHours, endMinutes, 0, 0)
    setEndDate(endDate)
  }, [timerState.selectedExam])

  if (!isMounted) {
    return null
  }

  return (
    <section className="flex flex-col gap-y-2 my-4">
      {isVisibleDailyExamPractice && (
        <div className="card gap-y-2">
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
      <div className="card z-40">
        <ExamSelect />
        <div className="relative">
          <DailyExamPracticeOverlay startDate={startDate} endDate={endDate} />
          <AnalogClock clockRotations={clockRotations} />
        </div>
        <ExamInfo selectedExam={timerState.selectedExam} />
      </div>
    </section>
  )
}

export default Page
