'use client'

import { useGetProfileQuery } from '@/features/profile.slice'
import { useGetLastExamResultsQuery } from '@/features/examResults.slice'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  calculateTYTScores,
  calculateTytRawRanking,
  calculateAYTScores,
  calculateSayRawRanking,
  calculateEaRawRanking,
  calculateSozRawRanking,
  calculateTytPlacementRanking,
  calculateSayPlacementRanking,
  calculateEaPlacementRanking,
  calculateSozPlacementRanking,
} from '@/utils/yksCalculator'
import { SubjectResult } from '@/types'

// TYT Subject IDs
const tytTurkishId = 'ce164057-c0fb-4770-9951-bff7b6089537'
const tytMathId = '58017200-0ff0-4aad-9f37-f5235989dc67'
const tytPhysicsId = 'b4835e2c-cb12-4f58-9405-daada69fb473'
const tytChemistryId = '18400b98-faeb-4f7b-bc87-5f8d798e0e6b'
const tytBiologyId = '441fd0c8-dbea-4141-a89a-048e6330a1e4'
const tytHistoryId = 'fbb509ba-431d-400f-bde4-c0f64c2c1508'
const tytGeographyId = 'b07f1bcc-2422-47e4-b56b-a5d1f413b0f7'
const tytPhilosophyId = '8c22c4e2-8fa0-4d68-9dbd-6a423588de60'
const tytReligionId = '6a897488-1ca9-407c-93ba-6ad502496448'

// AYT Subject IDs
const aytMathScientificId = 'ef4a20d5-b3c7-4942-90f4-78f4c7dc7eca'
const aytMathEqualWeightId = '80221e43-18c3-4573-8b85-ce8946a40d5a'
const aytPhysicsId = '0888bbac-dafd-48e1-a500-69a3366758e3'
const aytChemistryId = '0563701e-d3ac-45f8-98fd-33eb57d65957'
const aytBiologyId = '78697ab9-b0cf-4bb6-ad91-d99928555168'
const aytLiteratureEqualWeightId = '79fd2f86-6ef6-4509-8edb-0a351572af4a'
const aytLiteratureVerbalId = '3e094f1d-79c3-4b83-b9c3-5f704ed8900c'
const aytHistory1EqualWeightId = '570b09a7-cae9-41fe-ba2c-5cda0f56c91b'
const aytHistory1VerbalId = '80253263-9278-4dc4-9065-bf88589f5854'
const aytGeography1EqualWeightId = '409f2a31-3572-442a-86eb-22b9e2628edf'
const aytGeography1VerbalId = '949c9c11-bb12-4941-9db7-1be437e072f3'
const aytHistory2Id = 'e7bf9c65-0e9a-47a7-b1c6-6b21035e3d9a'
const aytGeography2Id = '7bbc8221-a156-4da2-bf6b-bd24f4954150'
const aytPhilosophyId = 'a62143b7-8ddf-45fb-80e0-f24c79cdb59d'
const aytReligionId = 'b4765b3e-b009-483a-b1e8-b5c7433ed2cc'

const LastYKSRanking = () => {
  const { data: profile } = useGetProfileQuery()
  const { data: lastExamResults } = useGetLastExamResultsQuery()

  // TYT results
  const [tytResult, setTytResult] = useState<{ rawScore: number; placementScore: number } | null>(
    null,
  )
  const [tytRanking, setTytRanking] = useState<{
    rawRank: number | string
    placementRank: number | string
  }>({
    rawRank: '-',
    placementRank: '-',
  })

  // AYT results
  const [aytResult, setAytResult] = useState<{
    sayRawScore: number
    sayPlacementScore: number
    eaRawScore: number
    eaPlacementScore: number
    sozRawScore: number
    sozPlacementScore: number
  } | null>(null)

  // AYT rankings
  const [aytRanking, setAytRanking] = useState({
    sayRawRank: '-' as number | string,
    sayPlacementRank: '-' as number | string,
    eaRawRank: '-' as number | string,
    eaPlacementRank: '-' as number | string,
    sozRawRank: '-' as number | string,
    sozPlacementRank: '-' as number | string,
  })

  const calculateScores = () => {
    // Calculate TYT nets
    const tytTurkishNet = lastExamResults?.TYT?.subjectResults.reduce(
      (acc: number, result: SubjectResult) => {
        if (result.subject_id === tytTurkishId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      },
      0,
    )
    const tytMathNet = lastExamResults?.TYT?.subjectResults.reduce(
      (acc: number, result: SubjectResult) => {
        if (result.subject_id === tytMathId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      },
      0,
    )
    const tytSocialNet = lastExamResults?.TYT?.subjectResults.reduce(
      (acc: number, result: SubjectResult) => {
        if (
          result.subject_id === tytHistoryId ||
          result.subject_id === tytGeographyId ||
          result.subject_id === tytReligionId ||
          result.subject_id === tytPhilosophyId
        ) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      },
      0,
    )
    const tytScienceNet = lastExamResults?.TYT?.subjectResults.reduce(
      (acc: number, result: SubjectResult) => {
        if (
          result.subject_id === tytPhysicsId ||
          result.subject_id === tytChemistryId ||
          result.subject_id === tytBiologyId
        ) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      },
      0,
    )

    // Calculate AYT nets
    const aytMathNet =
      lastExamResults?.AYT_Sayisal?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytMathScientificId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) ||
      lastExamResults?.AYT_EsitAgirlik?.subjectResults.reduce(
        (acc: number, result: SubjectResult) => {
          if (result.subject_id === aytMathEqualWeightId) {
            return acc + result.correct_count - result.incorrect_count * 0.25
          }
          return acc
        },
        0,
      ) ||
      0

    const aytPhysicsNet =
      lastExamResults?.AYT_Sayisal?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytPhysicsId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) || 0

    const aytChemistryNet =
      lastExamResults?.AYT_Sayisal?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytChemistryId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) || 0

    const aytBiologyNet =
      lastExamResults?.AYT_Sayisal?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytBiologyId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) || 0

    const aytLiteratureNet =
      lastExamResults?.AYT_EsitAgirlik?.subjectResults.reduce(
        (acc: number, result: SubjectResult) => {
          if (result.subject_id === aytLiteratureEqualWeightId) {
            return acc + result.correct_count - result.incorrect_count * 0.25
          }
          return acc
        },
        0,
      ) ||
      lastExamResults?.AYT_Sozel?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytLiteratureVerbalId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) ||
      0

    const aytHistory1Net =
      lastExamResults?.AYT_EsitAgirlik?.subjectResults.reduce(
        (acc: number, result: SubjectResult) => {
          if (result.subject_id === aytHistory1EqualWeightId) {
            return acc + result.correct_count - result.incorrect_count * 0.25
          }
          return acc
        },
        0,
      ) ||
      lastExamResults?.AYT_Sozel?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytHistory1VerbalId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) ||
      0

    const aytGeography1Net =
      lastExamResults?.AYT_EsitAgirlik?.subjectResults.reduce(
        (acc: number, result: SubjectResult) => {
          if (result.subject_id === aytGeography1EqualWeightId) {
            return acc + result.correct_count - result.incorrect_count * 0.25
          }
          return acc
        },
        0,
      ) ||
      lastExamResults?.AYT_Sozel?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytGeography1VerbalId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) ||
      0

    const aytHistory2Net =
      lastExamResults?.AYT_Sozel?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytHistory2Id) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) || 0

    const aytGeography2Net =
      lastExamResults?.AYT_Sozel?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytGeography2Id) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) || 0

    const aytPhilosophyNet =
      lastExamResults?.AYT_Sozel?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytPhilosophyId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) || 0

    const aytReligionNet =
      lastExamResults?.AYT_Sozel?.subjectResults.reduce((acc: number, result: SubjectResult) => {
        if (result.subject_id === aytReligionId) {
          return acc + result.correct_count - result.incorrect_count * 0.25
        }
        return acc
      }, 0) || 0

    if (tytTurkishNet || tytMathNet || tytSocialNet || tytScienceNet) {
      // Calculate TYT scores
      const tytResult = calculateTYTScores({
        turkishNet: tytTurkishNet || 0,
        mathNet: tytMathNet || 0,
        scienceNet: tytScienceNet || 0,
        socialStudiesNet: tytSocialNet || 0,
        grade: profile?.obp || 0,
        isGraduated: profile?.graduated || false,
      })
      setTytResult(tytResult)

      // Calculate TYT rankings
      const rawRank = calculateTytRawRanking(tytResult.rawScore)
      const placementRank = calculateTytPlacementRanking(tytResult.placementScore)
      setTytRanking({ rawRank, placementRank })

      // Calculate AYT scores and rankings
      const aytResult = calculateAYTScores({
        turkishNet: tytTurkishNet || 0,
        mathNet: tytMathNet || 0,
        scienceNet: tytScienceNet || 0,
        socialStudiesNet: tytSocialNet || 0,
        aytMathNet,
        aytPhysicsNet,
        aytChemistryNet,
        aytBiologyNet,
        aytLiteratureNet,
        aytHistory1Net,
        aytGeography1Net,
        aytHistory2Net,
        aytGeography2Net,
        aytPhilosophyNet,
        aytReligionNet,
        grade: profile?.obp || 0,
        isGraduated: profile?.graduated || false,
      })
      setAytResult(aytResult)

      // Calculate AYT rankings
      setAytRanking({
        sayRawRank: calculateSayRawRanking(aytResult.sayRawScore),
        sayPlacementRank: calculateSayPlacementRanking(aytResult.sayPlacementScore),
        eaRawRank: calculateEaRawRanking(aytResult.eaRawScore),
        eaPlacementRank: calculateEaPlacementRanking(aytResult.eaPlacementScore),
        sozRawRank: calculateSozRawRanking(aytResult.sozRawScore),
        sozPlacementRank: calculateSozPlacementRanking(aytResult.sozPlacementScore),
      })
    }
  }

  useEffect(() => {
    if (lastExamResults) calculateScores()
  }, [lastExamResults, profile])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Son YKS Sıralaması</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-3 text-left">Sınav</th>
                <th className="p-3 text-left">Ham Puan</th>
                <th className="p-3 text-left">Ham Sıralama</th>
                <th className="p-3 text-left">Yerleştirme Puanı</th>
                <th className="p-3 text-left">Yerleştirme Sıralama</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-3 font-medium">TYT</td>
                <td className="p-3">{tytResult?.rawScore?.toFixed(3)}</td>
                <td className="p-3">{tytRanking.rawRank.toLocaleString('en-US')}</td>
                <td className="p-3">{tytResult?.placementScore?.toFixed(3)}</td>
                <td className="p-3">{tytRanking.placementRank.toLocaleString('en-US')}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Sayısal</td>
                <td className="p-3">{aytResult?.sayRawScore?.toFixed(3)}</td>
                <td className="p-3">{aytRanking.sayRawRank.toLocaleString('en-US')}</td>
                <td className="p-3">{aytResult?.sayPlacementScore?.toFixed(3)}</td>
                <td className="p-3">{aytRanking.sayPlacementRank.toLocaleString('en-US')}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-3 font-medium">Eşit Ağırlık</td>
                <td className="p-3">{aytResult?.eaRawScore?.toFixed(3)}</td>
                <td className="p-3">{aytRanking.eaRawRank.toLocaleString('en-US')}</td>
                <td className="p-3">{aytResult?.eaPlacementScore?.toFixed(3)}</td>
                <td className="p-3">{aytRanking.eaPlacementRank.toLocaleString('en-US')}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Sözel</td>
                <td className="p-3">{aytResult?.sozRawScore?.toFixed(3)}</td>
                <td className="p-3">{aytRanking.sozRawRank.toLocaleString('en-US')}</td>
                <td className="p-3">{aytResult?.sozPlacementScore?.toFixed(3)}</td>
                <td className="p-3">{aytRanking.sozPlacementRank.toLocaleString('en-US')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>* 2024 YKS verileri kullanılarak son TYT ve AYT denemenize göre hesaplanmıştır.</p>
          <p>* Diploma Notu: {profile?.obp || 0} puanı kullanılmıştır.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default LastYKSRanking
