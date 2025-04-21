export const ROUTES = {
  HOME: '/',
  DENEMELERIM: '/denemelerim',
  EXAMPRACTICE: '/deneme',
  DAILYEXAMPRACTICE: '/gunluk_deneme',
  POMODORO: '/pomodoro',
  PROFILE: '/profil',
  PAYMENT: '/odeme',
  YKS_OBP: '/yks_obp',
  PROFILE_TARGETS: '/profil/hedefler',
  CLERK_TARGETS: '/hedefler',
  DENEME_EKLE: '/denemelerim?ekle=true',
} as const

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]

export const getNavbarRoutes = () => {
  return Object.entries(ROUTES)
    .filter(
      ([key]) => !['YKS_OBP', 'PROFILE_TARGETS', 'CLERK_TARGETS', 'DENEME_EKLE'].includes(key),
    )
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
    case ROUTES.PAYMENT:
      return 'Ödeme'
    case ROUTES.YKS_OBP:
      return 'YKS OBP'
    case ROUTES.PROFILE_TARGETS:
      return 'Üniversite Hedefi'
    case ROUTES.CLERK_TARGETS:
      return 'Üniversite Hedefi'
    case ROUTES.DENEME_EKLE:
      return 'Deneme Ekle'
    default:
      // if route is not in ROUTES, this will throw an error
      const exhaustiveCheck: never = route
      return exhaustiveCheck
  }
}
