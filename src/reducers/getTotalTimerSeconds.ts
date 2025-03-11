import { EXAM } from '@/constants/constants'
import { TimerState } from './timerReducer'

const getTotalTimerSeconds = (timer: TimerState) => {
  if (timer.selectedExam === 'Custom') {
    return parseInt(timer.customMinutes) * 60
  }
  return EXAM[timer.selectedExam as EXAM].duration * 60
}

export default getTotalTimerSeconds
