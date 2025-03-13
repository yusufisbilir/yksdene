import { EXAM } from '@/constants/constants'
import { TimerState } from '@/contexts/TimerContext'

const getTotalTimerSeconds = (timer: TimerState) => {
  return EXAM[timer.selectedExam as EXAM].duration * 60
}

export default getTotalTimerSeconds
