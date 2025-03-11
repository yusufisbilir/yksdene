'use client'

import { useEffect, useReducer } from 'react'
import { Card, CardContent } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { EXAM } from '@/constants/constants'
import { TimerMode, initialState, timerReducer } from '@/reducers/timerReducer'
import DigitalTimer from './DigitalTimer'
import AnalogTimer from './AnalogTimer'

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
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <Select
            value={timerState.selectedExam}
            onValueChange={(value) => dispatch({ type: 'SET_EXAM', payload: value as EXAM })}
          >
            <SelectTrigger className="w-full border-orange-300 bg-white text-orange-950">
              <SelectValue placeholder="Sınav seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TYT" className="text-orange-950">
                {`TYT (${EXAM.TYT.duration} dakika)`}
              </SelectItem>
              <SelectItem value="AYT" className="text-orange-950">
                {`AYT (${EXAM.AYT.duration} dakika)`}
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
            <AnalogTimer timer={timerState} />
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
