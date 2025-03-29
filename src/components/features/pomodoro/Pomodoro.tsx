'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocalStorage } from 'usehooks-ts'
import { PlayIcon, PauseIcon, RefreshCwIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import formatTime from '@/utils/formatTime'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { pause, reset, setMode, start, updateSettings } from '@/features/pomodoro.slice'

export function Pomodoro() {
  const pomodoro = useAppSelector((state) => state.pomodoro)
  const dispatch = useAppDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [settings, setSettings] = useLocalStorage('pomodoroSettings', {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 10,
    longBreakInterval: 4,
  })

  const [tempSettings, setTempSettings] = useState(settings)

  useEffect(() => {
    setIsMounted(true)
    setTempSettings(settings)
  }, [settings])

  if (!isMounted) {
    return null
  }

  const handleSettingsChange =
    (key: keyof typeof settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value) || 0
      setTempSettings((prev) => ({ ...prev, [key]: value }))
    }

  const saveSettings = () => {
    setSettings(tempSettings)
    dispatch(updateSettings(tempSettings))
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button
            className="w-full sm:w-auto"
            variant={pomodoro.currentMode === 'pomodoro' ? 'default' : 'outline'}
            onClick={() => dispatch(setMode('pomodoro'))}
          >
            Pomodoro
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant={pomodoro.currentMode === 'shortBreak' ? 'default' : 'outline'}
            onClick={() => dispatch(setMode('shortBreak'))}
          >
            Kısa Mola
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant={pomodoro.currentMode === 'longBreak' ? 'default' : 'outline'}
            onClick={() => dispatch(setMode('longBreak'))}
          >
            Uzun Mola
          </Button>
        </div>

        <div className="text-center">
          <h2 className="text-6xl font-bold my-8">
            {formatTime(pomodoro.minutes, pomodoro.seconds)}
          </h2>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={() => dispatch(pomodoro.isRunning ? pause() : start())} size="lg">
            {pomodoro.isRunning ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </Button>
          <Button onClick={() => dispatch(reset())} variant="outline" size="lg">
            <RefreshCwIcon className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Tamamlanan Pomodoro: {pomodoro.completedPomodoros}
        </div>
      </div>

      <Collapsible className="flex flex-col gap-2">
        <CollapsibleTrigger>
          <p className="text-sm cursor-pointer">Ayarlar</p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pomodoroTime">Pomodoro (dakika)</Label>
                  <Input
                    id="pomodoroTime"
                    type="number"
                    value={tempSettings.pomodoroTime}
                    onChange={handleSettingsChange('pomodoroTime')}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="shortBreakTime">Kısa Mola (dakika)</Label>
                  <Input
                    id="shortBreakTime"
                    type="number"
                    value={tempSettings.shortBreakTime}
                    onChange={handleSettingsChange('shortBreakTime')}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="longBreakTime">Uzun Mola (dakika)</Label>
                  <Input
                    id="longBreakTime"
                    type="number"
                    value={tempSettings.longBreakTime}
                    onChange={handleSettingsChange('longBreakTime')}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="longBreakInterval">Uzun Mola İçin Yapılacak Pomodoro</Label>
                  <Input
                    id="longBreakInterval"
                    type="number"
                    value={tempSettings.longBreakInterval}
                    onChange={handleSettingsChange('longBreakInterval')}
                  />
                </div>
                <Button onClick={saveSettings} className="w-full">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
