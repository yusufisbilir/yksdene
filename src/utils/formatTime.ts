const formatTime = (min: number, sec: number) => {
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

export default formatTime
