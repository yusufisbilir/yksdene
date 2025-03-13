'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { EXAM } from '@/constants/constants'
import { useTimer } from '@/contexts/TimerContext'

const ExamSelect = () => {
  const { state, dispatch } = useTimer()

  return (
    <div className="flex items-center gap-x-4">
      <Select
        value={state.selectedExam}
        onValueChange={(value) => {
          dispatch({ type: 'RESET' })
          dispatch({ type: 'SET_EXAM', payload: value as EXAM })
        }}
      >
        <SelectTrigger className="w-full border-orange-300 bg-white text-orange-950">
          <SelectValue placeholder="Sınav seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TYT" className="text-orange-950">
            {`TYT (${EXAM.TYT.duration} dakika)`}
          </SelectItem>
          <SelectItem value="AYT" className="text-orange-950">
            {`AYT (${EXAM.AYT.duration} dakika)`}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ExamSelect
