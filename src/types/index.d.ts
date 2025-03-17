type TimerMode = 'digital' | 'analog'

export const Exam = {
  tyt: 'tyt',
  ayt: 'ayt',
} as const

export type Exam = (typeof Exam)[keyof typeof Exam]

export interface ClockRotations {
  updateSeconds: { transform: string }
  updateMinutes: { transform: string }
  updateHours: { transform: string }
}

interface TimerState {
  selectedExam: Exam
  minutes: number
  seconds: number
  isRunning: boolean
  isDirty: boolean
  isFinished: boolean
}
