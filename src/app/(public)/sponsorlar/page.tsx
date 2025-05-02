import React from 'react'

const instagramIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mr-2"
  >
    <rect width="24" height="24" rx="6" fill="#E1306C" />
    <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8A4.8 4.8 0 1 0 12 7.2Z" fill="white" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="white" />
  </svg>
)

const sponsors = [
  {
    name: '@yksdene',
    url: 'https://instagram.com/yksdene',
    description: 'Instagram sayfamız',
    icon: instagramIcon,
  },
  {
    name: '@yusufisbilirr',
    url: 'https://instagram.com/yusufisbilirr',
    description: 'Geliştirici',
    icon: instagramIcon,
  },
  {
    name: '@ozgefilms',
    url: 'https://instagram.com/ozgefilms',
    description: 'Sosyal Medya Yöneticisi',
    icon: instagramIcon,
  },
  {
    name: '@yksefecakiicii',
    url: 'https://instagram.com/yksefecakiicii',
    description: "Instagram'da ücretsiz destek olan sayfa.",
    icon: instagramIcon,
  },
  // Diğer sponsorlar buraya eklenebilir
]

export default function SponsorlarPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-pink-600 drop-shadow">
        Sponsorlar
      </h1>
      <ul className="space-y-6">
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.name}
            className="flex flex-col border rounded-xl p-6 gap-4 bg-white/80 hover:shadow-2xl transition-shadow duration-200 hover:scale-[1.02]"
          >
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xl font-semibold text-pink-600 hover:underline"
            >
              {sponsor.icon}
              {sponsor.name}
            </a>
            <span className="ml-4 text-gray-700 text-base">{sponsor.description}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center text-gray-500 text-sm">
        Destek olmak için <b>Instagram DM</b> üzerinden iletişime geçebilirsiniz.
      </div>
    </main>
  )
}
