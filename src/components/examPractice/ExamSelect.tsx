'use client'

import { Exam } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTimer } from '@/context/TimerContext'
import getExamDuration from '@/utils/getExamDuration'

const ExamSelect = () => {
  const { state, dispatch } = useTimer()

  return (
    <div className="flex items-center gap-x-4">
      <Select
        value={state.selectedExam}
        onValueChange={(value: Exam) => {
          dispatch({ type: 'RESET' })
          dispatch({ type: 'SET_EXAM', payload: value })
        }}
      >
        <SelectTrigger className="w-full border-orange-300 bg-white text-orange-950">
          <SelectValue placeholder="Sınav seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tyt" className="text-orange-950">
            {`TYT (${getExamDuration('tyt')} dakika)`}
          </SelectItem>
          <SelectItem value="ayt" className="text-orange-950">
            {`AYT (${getExamDuration('ayt')} dakika)`}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ExamSelect
