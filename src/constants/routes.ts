export const ROUTES = {
  HOME: '/',
  DENEMELERIM: '/denemelerim',
  EXAMPRACTICE: '/deneme',
  DAILYEXAMPRACTICE: '/gunluk_deneme',
  POMODORO: '/pomodoro',
} as const

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]

export const getRouteName = (route: RouteValue) => {
  switch (route) {
    case ROUTES.EXAMPRACTICE:
      return 'Deneme Çöz'
    case ROUTES.DAILYEXAMPRACTICE:
      return 'Günlük Deneme'
    case ROUTES.POMODORO:
      return 'Pomodoro'
    case ROUTES.DENEMELERIM:
      return 'Denemelerim'
    case ROUTES.HOME:
      return 'Anasayfa'
    default:
      // if route is not in ROUTES, this will throw an error
      const exhaustiveCheck: never = route
      return exhaustiveCheck
  }
}
