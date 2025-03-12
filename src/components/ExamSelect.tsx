'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { EXAM } from '@/constants/constants'
import { useTimer } from '@/contexts/TimerContext'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'

const ExamSelect = () => {
  const { state, dispatch } = useTimer()

  useEffect(() => {
    if (state.selectedExam === 'Custom') dispatch({ type: 'SET_CUSTOM_MINUTES', payload: '60' })
  }, [state.selectedExam])

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
          <SelectItem value="Custom" className="text-orange-950">
            Özel Süre
          </SelectItem>
        </SelectContent>
      </Select>

      {state.selectedExam === 'Custom' && (
        <Input
          type="number"
          value={state.customMinutes}
          onChange={(e) => dispatch({ type: 'SET_CUSTOM_MINUTES', payload: e.target.value })}
          placeholder="Dakika girin"
          min={0}
          className="w-full p-2 rounded-md bg-white border border-orange-300 text-orange-950 placeholder:text-orange-500"
        />
      )}
    </div>
  )
}

export default ExamSelect
