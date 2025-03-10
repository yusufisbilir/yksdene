'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

type TimerMode = 'digital' | 'analog'

const EXAM_TIMES = {
  TYT: 135,
  AYT: 180,
  Custom: 0,
}

export function Timer() {
  const [selectedExam, setSelectedExam] = useState<keyof typeof EXAM_TIMES>('Custom')
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<TimerMode>('digital')
  const [customMinutes, setCustomMinutes] = useState('')

  useEffect(() => {
    if (selectedExam !== 'Custom') {
      setMinutes(EXAM_TIMES[selectedExam])
      setSeconds(0)
    }
  }, [selectedExam])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          setIsRunning(false)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, minutes, seconds])

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setIsRunning(true)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    if (selectedExam === 'Custom') {
      setMinutes(parseInt(customMinutes) || 0)
    } else {
      setMinutes(EXAM_TIMES[selectedExam])
    }
    setSeconds(0)
  }

  const handleCustomMinutesChange = (value: string) => {
    setCustomMinutes(value)
    if (selectedExam === 'Custom') {
      setMinutes(parseInt(value) || 0)
      setSeconds(0)
    }
  }

  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-xl mx-auto bg-white shadow-lg border border-orange-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-orange-500">YKS Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <Select
            value={selectedExam}
            onValueChange={(value) => setSelectedExam(value as keyof typeof EXAM_TIMES)}
          >
            <SelectTrigger className="w-full border-orange-300 bg-white text-orange-950">
              <SelectValue placeholder="Sınav seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TYT" className="text-orange-950">
                TYT (135 dakika)
              </SelectItem>
              <SelectItem value="AYT" className="text-orange-950">
                AYT (180 dakika)
              </SelectItem>
              <SelectItem value="Custom" className="text-orange-950">
                Özel Süre
              </SelectItem>
            </SelectContent>
          </Select>

          {selectedExam === 'Custom' && (
            <input
              type="number"
              value={customMinutes}
              onChange={(e) => handleCustomMinutesChange(e.target.value)}
              placeholder="Dakika girin"
              className="w-full p-2 rounded-md bg-white border border-orange-300 text-orange-950 placeholder:text-orange-500"
            />
          )}
        </div>

        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as TimerMode)}
          className="w-full"
        >
          <TabsList className="w-full bg-orange-100">
            <TabsTrigger
              value="digital"
              className="w-full data-[state=active]:bg-white text-orange-950"
            >
              Dijital
            </TabsTrigger>
            <TabsTrigger
              value="analog"
              className="w-full data-[state=active]:bg-white text-orange-950"
            >
              Analog
            </TabsTrigger>
          </TabsList>
          <TabsContent value="digital" className="mt-4">
            <div className="text-6xl font-mono text-center text-orange-500">
              {formatTime(minutes, seconds)}
            </div>
          </TabsContent>
          <TabsContent value="analog" className="mt-4">
            <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-orange-300 bg-white">
              <div
                className="absolute w-1 h-24 bg-orange-400 top-24 left-24 origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `rotate(${
                    ((minutes * 60 + seconds) / (60 * 60)) * 360
                  }deg) translateY(-50%)`,
                }}
              />
              <div
                className="absolute w-1 h-20 bg-orange-600 top-24 left-24 origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `rotate(${(seconds / 60) * 360}deg) translateY(-50%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-lg font-mono text-orange-500">
                {formatTime(minutes, seconds)}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Başlat
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium"
            >
              Duraklat
            </Button>
          )}
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-orange-300 text-orange-600 hover:bg-orange-50 font-medium"
          >
            Sıfırla
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
