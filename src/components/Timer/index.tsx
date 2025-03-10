'use client'

import { useEffect, useReducer } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { EXAM_TIMES } from '@/constants/constants'
import { TimerMode, initialState, timerReducer } from '@/reducers/timerReducer'
import DigitalTimer from './DigitalTimer'
import formatTime from '@/utils/formatTime'

export default function Timer() {
  const [timerState, dispatch] = useReducer(timerReducer, initialState)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timerState.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [timerState.isRunning])

  return (
    <Card className="w-full max-w-xl mx-auto bg-white shadow-lg border border-orange-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-orange-500">YKS Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <Select
            value={timerState.selectedExam}
            onValueChange={(value) =>
              dispatch({ type: 'SET_EXAM', payload: value as keyof typeof EXAM_TIMES })
            }
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

          {timerState.selectedExam === 'Custom' && (
            <input
              type="number"
              value={timerState.customMinutes}
              onChange={(e) => dispatch({ type: 'SET_CUSTOM_MINUTES', payload: e.target.value })}
              placeholder="Dakika girin"
              className="w-full p-2 rounded-md bg-white border border-orange-300 text-orange-950 placeholder:text-orange-500"
            />
          )}
        </div>

        <Tabs
          value={timerState.mode}
          onValueChange={(value) => dispatch({ type: 'SET_MODE', payload: value as TimerMode })}
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
            <DigitalTimer timer={timerState} />
          </TabsContent>
          <TabsContent value="analog" className="mt-4">
            <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-orange-300 bg-white">
              <div
                className="absolute w-1 h-24 bg-orange-400 top-24 left-24 origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `rotate(${
                    ((timerState.minutes * 60 + timerState.seconds) / (60 * 60)) * 360
                  }deg) translateY(-50%)`,
                }}
              />
              <div
                className="absolute w-1 h-20 bg-orange-600 top-24 left-24 origin-bottom transform -translate-x-1/2"
                style={{
                  transform: `rotate(${(timerState.seconds / 60) * 360}deg) translateY(-50%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-lg font-mono text-orange-500">
                {formatTime(timerState.minutes, timerState.seconds)}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center gap-4">
          {!timerState.isRunning ? (
            <Button
              onClick={() => dispatch({ type: 'START' })}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Başlat
            </Button>
          ) : (
            <Button
              onClick={() => dispatch({ type: 'PAUSE' })}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium"
            >
              Duraklat
            </Button>
          )}
          <Button
            onClick={() => dispatch({ type: 'RESET' })}
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
