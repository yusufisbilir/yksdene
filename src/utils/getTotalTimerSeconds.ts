import getExamDuration from './getExamDuration'
import { TimerState } from '@/types'

const getTotalTimerSeconds = (timer: TimerState) => {
  return getExamDuration(timer.selectedExam) * 60
}

export default getTotalTimerSeconds
