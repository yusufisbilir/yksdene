'use client'

import ExamSelect from '@/components/features/examPractice/ExamSelect'
import { useEffect, useState } from 'react'
import getExamStartEndTimes from '@/utils/getExamStartEndTimes'
import useDailyExamTimer from '@/hooks/useDailyExamTimer'
import { useAppSelector } from '@/hooks/useRedux'
import AnalogClock from '@/components/shared/AnalogClock'
import ExamInfo from './ExamInfo'
import DailyExamPracticeOverlay from './DailyExamPracticeOverlay'
import InfoBox from './InfoBox'

const DailyExamPractice = () => {
  const timerState = useAppSelector((state) => state.timer)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const { clockRotations } = useDailyExamTimer({
    startDate: startDate,
    endDate: endDate,
  })

  useEffect(() => {
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

  return (
    <section className="centered_panel space-y-2">
      <InfoBox />
      <div className="z-40 card">
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

export default DailyExamPractice
