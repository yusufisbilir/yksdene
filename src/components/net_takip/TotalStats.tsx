interface TotalStatsProps {
  correct: number
  incorrect: number
  blank: number
  net: number
}

export function TotalStats({ correct, incorrect, blank, net }: TotalStatsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{correct} Doğru</span>
      <span className="text-sm text-muted-foreground">{incorrect} Yanlış</span>
      <span className="text-sm text-muted-foreground">{blank} Boş</span>
      <span className="text-sm font-medium">{net.toFixed(2)} Net</span>
    </div>
  )
}
