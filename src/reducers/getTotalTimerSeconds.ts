import { EXAM_TIMES } from '@/constants/constants'
import { TimerState } from './timerReducer'

const getTotalTimerSeconds = (timer: TimerState) => {
  if (timer.selectedExam === 'Custom') {
    return parseInt(timer.customMinutes) * 60
  }
  return EXAM_TIMES[timer.selectedExam] * 60
}

export default getTotalTimerSeconds
