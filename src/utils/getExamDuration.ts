import { Exam } from '@/types'

const getExamDuration = (exam: Exam) => {
  switch (exam) {
    case 'tyt':
      return 165
    case 'ayt':
      return 180
  }
}

export default getExamDuration
