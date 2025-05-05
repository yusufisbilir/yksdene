import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { ChevronRight, Home, Trophy, Info, Calendar } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { LeaderBoard } from '@/types'
import universityProgramsData from '@/constants/universityPrograms/universityPrograms.json'

// Helper function to render rank number or badge for top ranks
const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return <div className="bg-yellow-500 text-white px-2 py-1 rounded-full font-bold">🏆 1</div>
    case 2:
      return <div className="bg-gray-400 text-white px-2 py-1 rounded-full font-bold">🥈 2</div>
    case 3:
      return <div className="bg-amber-700 text-white px-2 py-1 rounded-full font-bold">🥉 3</div>
    default:
      return rank
  }
}

// Helper function to get field/area badge color
const getFieldBadgeColor = (field: string | null) => {
  switch (field) {
    case 'say':
      return 'bg-blue-100 text-blue-800'
    case 'soz':
      return 'bg-purple-100 text-purple-800'
    case 'ea':
      return 'bg-green-100 text-green-800'
    case 'tyt':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Helper function to get category display name
const getCategoryDisplayName = (category: string | null) => {
  switch (category) {
    case 'say':
      return 'Sayısal'
    case 'soz':
      return 'Sözel'
    case 'ea':
      return 'Eşit Ağırlık'
    case 'tyt':
      return 'TYT'
    default:
      return 'Belirtilmemiş'
  }
}

// Üniversite programları için type tanımlama
type UniversityProgram = {
  id: string
  university: string
  program: string
  category: 'say' | 'soz' | 'ea' | 'tyt' | 'dil'
}

// JSON dosyasını doğru tipte kullanabilmek için
const typedUniversityPrograms = universityProgramsData as UniversityProgram[]

// Üniversite program bilgilerini alma fonksiyonu
const getUniversityProgramInfo = (programId: string | null) => {
  if (!programId) {
    return {
      displayName: 'Belirtilmemiş',
      category: null,
    }
  }

  const program = typedUniversityPrograms.find((p) => p.id === programId)

  if (!program) {
    return {
      displayName: 'Belirtilmemiş',
      category: null,
    }
  }

  return {
    displayName: `${program.university} ${program.program}`,
    category: program.category,
  }
}

export default function LeaderBoardView({ leaderboardData }: { leaderboardData: LeaderBoard[] }) {
  return (
    <Card className="border-t-4 border-t-blue-500 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Zirvedekiler
          </span>
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Deneme çözerek sınav kazanmayı bilenler
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">Sıra</TableHead>
                <TableHead>Öğrenci</TableHead>
                <TableHead className="hidden md:table-cell">Üniversite Hedefi</TableHead>
                <TableHead className="hidden sm:table-cell text-center">Alan</TableHead>
                <TableHead className="hidden lg:table-cell text-center">Sıralama</TableHead>
                <TableHead className="text-center">Toplam Deneme</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((student, index) => {
                const programInfo = getUniversityProgramInfo(student.university_program)
                const category = programInfo.category

                const rankToShow =
                  category === 'tyt'
                    ? student.tyt_placement_rank
                    : category === 'say'
                    ? student.say_placement_rank
                    : category === 'soz'
                    ? student.soz_placement_rank
                    : student.ea_placement_rank

                return (
                  <TableRow key={student.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="text-center font-medium">
                      {getRankBadge(index + 1)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.image_url || ''} alt={student.name || ''} />
                          <AvatarFallback>
                            {student.name
                              ? student.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                              : '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name || 'İsimsiz'}</div>
                          {student.username && (
                            <div className="text-xs text-muted-foreground">@{student.username}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {programInfo.displayName}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getFieldBadgeColor(
                          category,
                        )}`}
                      >
                        {getCategoryDisplayName(category)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-center text-muted-foreground">
                      {rankToShow ? rankToShow.toLocaleString() : '-'}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {student.total_exam_attempts}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 px-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Info className="w-4 h-4 text-blue-500" />
          <span>Bu sıralama, platformda en çok deneme çözen öğrencileri göstermektedir.</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>Sıralama haftalık olarak instagram @yksdene sayfamızda paylaşılıyor.</span>
        </div>
      </CardFooter>
    </Card>
  )
}
