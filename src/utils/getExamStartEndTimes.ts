import { Exam } from '@/types'

const getExamStartEndTimes = (exam: Exam) => {
  switch (exam) {
    case 'tyt':
      return { start: '10:15', end: '13:00' }
    case 'ayt':
      return { start: '10:15', end: '13:15' }
  }
}

export default getExamStartEndTimes
