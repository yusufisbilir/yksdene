type TimerMode = 'digital' | 'analog'

export const Exam = {
  tyt: 'tyt',
  ayt: 'ayt',
} as const

export type Exam = (typeof Exam)[keyof typeof Exam]
