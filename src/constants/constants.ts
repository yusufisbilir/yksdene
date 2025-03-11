export const EXAM = {
  TYT: { duration: 165, time: new Date(2025, 5, 21, 10, 15, 0) },
  AYT: { duration: 180, time: new Date(2025, 5, 22, 10, 15, 0) },
  Custom: { duration: 60, time: new Date(2025, 5, 21, 10, 15, 0) },
} as const

export type EXAM = keyof typeof EXAM // Define a type for the keys
