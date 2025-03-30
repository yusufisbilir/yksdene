'use client'

import { Exam } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import { reset, setExam } from '@/features/timer.slice'
import getExamDuration from '@/utils/getExamDuration'

const ExamSelect = () => {
  const timerState = useAppSelector((state) => state.timer)
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center gap-x-4">
      <Select
        value={timerState.selectedExam}
        onValueChange={(value: Exam) => {
          dispatch(reset())
          dispatch(setExam(value))
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
