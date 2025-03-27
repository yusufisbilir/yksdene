export const ROUTES = {
  HOME: '/',
  EXAMPRACTICE: '/deneme',
  DAILYEXAMPRACTICE: '/gunluk_deneme',
  POMODORO: '/pomodoro',
  NET_TAKIP: '/net_takip',
  LOGIN: '/login',
} as const

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]

export const getRouteName = (route: RouteValue) => {
  switch (route) {
    case ROUTES.EXAMPRACTICE:
      return 'Deneme'
    case ROUTES.DAILYEXAMPRACTICE:
      return 'Günlük Deneme'
    case ROUTES.POMODORO:
      return 'Pomodoro'
    case ROUTES.NET_TAKIP:
      return 'Net Takip'
    case ROUTES.LOGIN:
      return 'Giriş'
    case ROUTES.HOME:
      return 'Anasayfa'
    default:
      // if route is not in ROUTES, this will throw an error
      const exhaustiveCheck: never = route
      return exhaustiveCheck
  }
}
