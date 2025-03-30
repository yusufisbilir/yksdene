'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function InfoBox() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisibleDailyExamPractice, setIsVisibleDailyExamPractice] = useLocalStorage(
    'isVisibleDailyExamPractice',
    true,
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  if (!isVisibleDailyExamPractice) {
    return null
  }

  return (
    <div className="card gap-y-2">
      <h1 className="font-semibold">Gerçek Sınav Deneyimi</h1>
      <p>Her sabah 10:15&apos;te başlar. Başarılar dilerim ❤️</p>
      <Button className="self-end max-w-fit" onClick={() => setIsVisibleDailyExamPractice(false)}>
        Anladım Hocam, Hallederiz
      </Button>
    </div>
  )
}
