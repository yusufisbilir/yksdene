# YKS Dene - Enterprise-Grade Sınav Hazırlık Platformu

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-000000?style=flat-square&logo=vercel)](https://vercel.com/)

[yksdene.com](https://yksdene.com)

## Proje Özeti

**YKS Dene**, Next.js 15 App Router mimarisi üzerine inşa edilmiş, üniversite sınavına hazırlanan öğrenciler için geliştirilmiş kapsamlı bir performans izleme ve analiz platformudur. Bu uygulama, öğrencilerin çalışma süreçlerindeki eksiklerini veri odaklı yaklaşımla tespit edip, kişiselleştirilmiş çözümler sunarak sınav başarılarını artırmayı hedefler.

## Teknik Mimari

### Server-Side Rendering (SSR) Yaklaşımı

Next.js App Router'ın sunduğu SSR/RSC (React Server Components) yapısını projenin merkezine konumlandırdım. Bu tercih:

- **SEO Optimizasyonu**: Arama motorları tarafından statik içerik olarak taranabilen sayfalar
- **İlk Yükleme Performansı**: Daha düşük TTFB (Time To First Byte) ve LCP (Largest Contentful Paint) süreleri
- **Güvenlik Avantajı**: Hassas işlemlerin sunucu tarafında gerçekleştirilmesi

SSR yaklaşımını desteklemek için, Supabase SSR modülünü entegre ettim. Client-side state ve server-side data fetching arasındaki dengeyi React Query ile optimize ettim.

### Proje Yapısı

```
src/
├── app/            # Next.js App Router rotaları ve sayfa bileşenleri
├── components/     # Atomik tasarım prensibiyle organize edilmiş UI bileşenleri
├── contexts/       # Uygulama genelinde erişilebilen React context'leri
├── features/       # İşlevsel özellikler için domain-driven modüller
├── hooks/          # Özelleştirilmiş React hooks
├── lib/            # Üçüncü parti kütüphane konfigürasyonları
├── providers/      # Uygulama provider'ları
├── services/       # Harici API ve veri kaynaklarına bağlantı servisleri
├── store/          # Redux Toolkit tabanlı state yönetimi
├── types/          # TypeScript tip tanımlamaları
└── utils/          # Yardımcı fonksiyonlar
```

Projenin kod mimarisi, domain-driven design ve separation of concerns prensiplerine dayanır. İlgili kod parçalarının aynı klasörde tutulması ve modüler organizasyon, kod bakımını ve geliştirilebilirliği önemli ölçüde artırır.

### State Yönetimi Stratejisi

Redux Toolkit'i merkezi state yönetimi için tercih ederken, daha yerel ve UI odaklı state'ler için React'ın kendi Context API'sini kullandım. Bu hibrit yaklaşım:

- **Performans**: Gereksiz render'ları minimize eder
- **Developer Experience**: Redux DevTools ile debug süreçlerini hızlandırır
- **Bakım**: İlgili state'lerin doğru seviyelerde enkapsüle edilmesini sağlar

RTK Query ile yapılan API çağrıları, otomatik cache yönetimi ve optimistik güncellemeler sağlayarak kullanıcı deneyimini iyileştirir.

## Güvenlik ve Yetkilendirme

### Auth Mimarisi

Kimlik doğrulama için endüstri standardı Clerk kullanılmıştır. Bu tercih:

- **JWTs & Session Yönetimi**: Modern ve güvenli kimlik doğrulama
- **Multi-tenancy**: Farklı kullanıcı tipleri için rol tabanlı erişim kontrolleri
- **Sosyal Login Entegrasyonu**: OAuth 2.0 destekli sosyal medya girişleri

### Route Koruması ve Erişim Kontrolleri

```typescript
// src/middleware.ts
// Route koruması için Next.js Middleware kullanımı
export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  const { userId } = await auth()

  // Admin rotalarını koru
  if (isAdminRoute(req)) {
    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      const homeURL = new URL(ROUTES.HOME, req.url)
      return NextResponse.redirect(homeURL)
    }
  }

  // API rotalarını koru
  if (req.nextUrl.pathname.startsWith('/api/') && !userId && !isPublicRoute(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
})
```

Bu middleware, kullanıcının kimlik doğrulamasını ve yetkilendirmesini merkezi bir noktadan yönetir. Böylece kod tekrarı önlenir ve güvenlik politikaları tutarlı bir şekilde uygulanır.

### API Güvenliği

- **CORS Yapılandırması**: Beyaz listeye alınmış originler için sınırlı erişim
- **HTTP-only Cookies**: XSS saldırılarına karşı koruma
- **Content Security Policy**: İnline script'leri ve stil enjeksiyonlarını engelleme

## Rate Limiting ve Koruma Mekanizmaları

Edge Middleware kullanılarak geliştirilmiş bir rate limiting sistemi, aşağıdaki koruma katmanlarını içerir:

- **IP Tabanlı Throttling**: Aynı IP adresinden gelen aşırı istek sayısını sınırlama
- **API Endpoint Koruması**: Hassas endpointler için özel limit tanımları
- **Token Bucket Algoritması**: Adil ve esnek bir rate limiting için

Bu yaklaşım, DDoS saldırılarına karşı koruma sağlarken, normal kullanıcı davranışlarını etkilemez.

## Performans Optimizasyonları

### Statik/Dinamik Dengeleme

Next.js'in sunduğu hibrit rendering ile:

- **Statik Sayfalar**: ISR (Incremental Static Regeneration) ile nadiren değişen içerikler önbelleğe alınır
- **Dinamik Sayfalar**: Kişiselleştirilmiş içerikler için SSR kullanılır
- **Route Segment Config**: Her sayfa için optimum rendering stratejisi

### Frontend Optimizasyonları

- **Component Lazy Loading**: Büyük bileşenler için React.lazy ve dynamic imports
- **Image Optimizasyonu**: next/image ile otomatik WebP/AVIF formatları ve responsive image serving
- **Bundle Size Yönetimi**: webpack-bundle-analyzer ile bundle içeriği monitörü

### Veri Erişim Stratejileri

- **SWR Patterns**: Stale-while-revalidate yaklaşımıyla güncel veri ve hızlı UI
- **Pagination ve Windowing**: Büyük veri setleri için verimli görüntüleme teknikleri
- **Prefetching**: Olası kullanıcı yolları için önceden veri yükleme

## Kullanılan Teknolojiler

### Frontend Core

- **Next.js 15**: App Router ile modern React mimarisi
- **TypeScript**: End-to-end tip güvenliği
- **Tailwind CSS**: Utility-first ve JIT derleyici ile düşük bundle size
- **Radix UI**: Erişilebilir ve tamamen özelleştirilebilir bileşen primitifleri

### State ve Veri Yönetimi

- **Redux Toolkit**: Tiplendirilmiş ve immutable global state
- **Zod**: Runtime tip validasyonu
- **React Hook Form**: Performans odaklı form yönetimi
- **Recharts**: SVG tabanlı, responsive veri görselleştirme

### DevOps ve Altyapı

- **Vercel**: Edge Network CDN ve otomatik deployment
- **Vercel Analytics & Speed Insights**: Gerçek kullanıcı metrikleri
- **Supabase**: PostgreSQL veritabanı ve Serverless fonksiyonlar

## Geliştirici Deneyimi

### Kod Kalitesi

- **ESLint**: Kod standardizasyonu ve hata denetimi
- **Prettier**: Tutarlı kod formatı
- **TypeScript Strict Mode**: Tip güvenliği ve daha az runtime hatası

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Geliştirme Araçları

- **Turbopack**: Hızlı development server
- **tsc-watch**: Otomatik tip kontrolü
- **Continuous Deployment**: Main branch'e yapılan her commit sonrası otomatik deployment

## Yol Haritası

Platformun gelecekteki geliştirme planları:

- **Real-time Collaboration**: Socket.io ile canlı çalışma grupları
- **AI Entegrasyonu**: Kişiselleştirilmiş çalışma önerileri
- **Progressive Web App**: Offline çalışma desteği
- **Internationalization**: Çoklu dil desteği

---

Yusuf İşbilir  
[GitHub](https://github.com/username) | [LinkedIn](https://linkedin.com/in/username)
