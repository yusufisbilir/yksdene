import { ClockRotations } from '@/types'
import Image from 'next/image'
import React from 'react'

const AnalogClock = ({ clockRotations }: { clockRotations: ClockRotations }) => {
  return (
    <div className="analog_timer_container">
      <Image
        src={'/analogTimeAssets/hour_body.svg'}
        alt="Hour Body"
        width={400}
        height={400}
        priority
        className="z-0"
      />
      <div
        className={`analog_timer_hour_hand`}
        style={{ transform: clockRotations.updateHours.transform }}
      ></div>
      <div
        className={`analog_timer_minute_hand`}
        style={{ transform: clockRotations.updateMinutes.transform }}
      ></div>
      <div
        className={`analog_timer_second_hand`}
        style={{ transform: clockRotations.updateSeconds.transform }}
      ></div>
      <div className={`analog_timer_center_circle`}></div>
    </div>
  )
}

export default AnalogClock
