import { TimerState } from '@/contexts/TimerContext'
import getExamDuration from './getExamDuration'

const getTotalTimerSeconds = (timer: TimerState) => {
  return getExamDuration(timer.selectedExam) * 60
}

export default getTotalTimerSeconds
