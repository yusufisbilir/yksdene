export const ROUTES = {
  HOME: '/',
  DENEMELERIM: '/denemelerim',
  EXAMPRACTICE: '/deneme',
  DAILYEXAMPRACTICE: '/gunluk_deneme',
  POMODORO: '/pomodoro',
  PROFILE: '/profil',
  YKS_OBP: '/yks_obp',
} as const

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]

export const getNavbarRoutes = () => {
  return Object.entries(ROUTES)
    .filter(([key]) => key !== 'YKS_OBP')
    .map(([key, value]) => ({ key, value }))
}

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
    case ROUTES.PROFILE:
      return 'Profil'
    case ROUTES.YKS_OBP:
      return 'YKS OBP'
    default:
      // if route is not in ROUTES, this will throw an error
      const exhaustiveCheck: never = route
      return exhaustiveCheck
  }
}
