import { Exam } from '@/types'
import getExamDuration from '@/utils/getExamDuration'
import getExamStartEndTimes from '@/utils/getExamStartEndTimes'
import React from 'react'

const ExamInfo = ({ selectedExam }: { selectedExam: Exam }) => {
  return (
    <div className="border border-gray-200 shadow-md rounded-lg max-w-fit mx-auto">
      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="text-gray-600 font-semibold">Sınav Başlama Saati:</div>
        <div className="text-orange-500 font-medium">
          {getExamStartEndTimes(selectedExam).start}
        </div>

        <div className="text-gray-600 font-semibold">Sınav Bitiş Saati:</div>
        <div className="text-orange-500 font-medium">{getExamStartEndTimes(selectedExam).end}</div>

        <div className="text-gray-600 font-semibold">Sınav Süresi:</div>
        <div className="text-orange-500 font-medium">{getExamDuration(selectedExam)} Dakika</div>
      </div>
    </div>
  )
}

export default ExamInfo
