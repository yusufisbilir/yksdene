export const ROUTES = {
  EXAMPRACTICE: '/deneme',
  DAILYEXAMPRACTICE: '/gunluk_deneme',
  POMODORO: '/pomodoro',
  NET_TAKIP: '/net_takip',
  LOGIN: '/login',
} as const

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]
