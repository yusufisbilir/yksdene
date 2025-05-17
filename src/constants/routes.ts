export const ROUTES = {
  HOME: '/',
  DENEMELERIM: '/denemelerim',
  EXAMPRACTICE: '/deneme',
  DAILYEXAMPRACTICE: '/gunluk_deneme',
  POMODORO: '/pomodoro',
  PROFILE: '/profil',
  YKS_OBP: '/yks_obp',
  PROFILE_TARGETS: '/profil/hedefler',
  CLERK_TARGETS: '/hedefler',
  DENEME_EKLE: '/denemelerim?ekle=true',
  SPONSORS: '/sponsorlar',
  ZIRVEDEKILER: '/zirvedekiler',
  // Group
  GROUPS: '/gruplar',
  GROUP_CREATE: '/gruplar/olustur',
  GROUP_DETAIL: (id: string) => `/gruplar/${id}`,
  GROUP_JOIN: '/gruplar/katil',
} as const

// Union type olarak hem string hem de fonksiyon tipleri destekleyen RouteValue
export type RouteValue = string | ((id: string) => string)

// Navbar için güvenli olan sadece string rotalar
type StaticRouteKeys = Exclude<keyof typeof ROUTES, 'GROUP_DETAIL' | 'GROUP_LEADERBOARD'>
type StaticRouteValues = (typeof ROUTES)[StaticRouteKeys]

// getNavbarRoutes için dönüş tipi
type NavbarRoute = { key: string; value: string }

export const getNavbarRoutes = (): NavbarRoute[] => {
  return Object.entries(ROUTES)
    .filter(
      ([key, value]) =>
        // Bu key'leri hariç tut
        ![
          'YKS_OBP',
          'PROFILE_TARGETS',
          'CLERK_TARGETS',
          'DENEME_EKLE',
          'GROUP_CREATE',
          'GROUP_JOIN',
          'GROUP_DETAIL',
          'GROUP_LEADERBOARD',
        ].includes(key) &&
        // Fonksiyon olanları da hariç tut (tip güvenliği için)
        typeof value === 'string',
    )
    .map(([key, value]) => ({ key, value: value as string }))
}

export const getRouteName = (route: RouteValue) => {
  // String ise doğrudan kontrol et
  if (typeof route === 'string') {
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
      case ROUTES.PROFILE_TARGETS:
        return 'Üniversite Hedefi'
      case ROUTES.CLERK_TARGETS:
        return 'Üniversite Hedefi'
      case ROUTES.DENEME_EKLE:
        return 'Deneme Ekle'
      case ROUTES.SPONSORS:
        return 'Sponsorlar'
      case ROUTES.ZIRVEDEKILER:
        return 'Zirvedekiler'
      case ROUTES.GROUPS:
        return 'Gruplar'
      case ROUTES.GROUP_CREATE:
        return 'Grup Oluştur'
      case ROUTES.GROUP_JOIN:
        return 'Gruba Katıl'
      default:
        if (route.startsWith('/gruplar/')) {
          if (route.includes('/siralamalar')) return 'Grup Sıralaması'
          return 'Grup Detayı'
        }
        return 'Bilinmeyen Sayfa'
    }
  }
  // Fonksiyon ise özel bir durum olduğunu belirt
  else {
    // GROUP_DETAIL ve GROUP_LEADERBOARD fonksiyonları
    return 'Grup Sayfası'
  }
}
