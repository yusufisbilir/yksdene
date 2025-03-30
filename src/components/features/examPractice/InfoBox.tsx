'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function ExamPracticeInfo() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisibleExamPractice, setIsVisibleExamPractice] = useLocalStorage(
    'isVisibleExamPractice',
    true,
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  if (!isVisibleExamPractice) {
    return null
  }

  return (
    <div className="card gap-y-2">
      <h1 className="font-semibold">İşte o saat 😱</h1>
      <p>
        Gerçek sınavda bu saate bakarak kalan süreni hesaplayacaksın.
        <br />
        Havalı kronometreler veya pomodoro uygulamaları yok.
        <br />
        Bitince bildirim sesi duyabilir ve biraz konfeti görebilirsin.
        <br />
        Başarılar dilerim ❤️
      </p>
      <Button className="self-end max-w-fit" onClick={() => setIsVisibleExamPractice(false)}>
        Anladım Hocam, Hallederiz
      </Button>
    </div>
  )
}
