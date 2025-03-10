'use client'

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { TimerState } from '@/reducers/timerReducer'
import formatTime from '@/utils/formatTime'
import getTotalTimerSeconds from '@/reducers/getTotalTimerSeconds'

export default function DigitalTimer({ timer }: { timer: TimerState }) {
  const currentSecond = timer.minutes * 60 + timer.seconds
  const chartData = [{ process: currentSecond, fill: 'var(--chart-1)' }]

  const chartConfig = {
    percentage: {
      label: 'Percentage',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  const totalSeconds = getTotalTimerSeconds(timer)
  const percentage = (chartData[0].process / totalSeconds) * 100

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={90 + percentage * 3.6}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="process" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl">
                      {formatTime(timer.minutes, timer.seconds)}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
