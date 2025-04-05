'use client'

import { useGetProfileQuery } from '@/features/profile.slice'
import { useGetLastExamResultsQuery } from '@/features/examResults.slice'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getYKSRankTableData, YKSRanking } from '@/utils/yksCalculator'
import { SubjectResult } from '@/types'
import { LastExamResults } from '@/services/last_exam_results.service'

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

  const [ranking, setRanking] = useState<YKSRanking | null>(null)

  const calculateScores = () => {
    // Helper function to calculate net scores for subjects
    const calculateNetScore = (examType: keyof LastExamResults, subjectIds: string | string[]) => {
      const results = lastExamResults?.[examType]?.subjectResults || []
      return (
        results.reduce((acc: number, result: SubjectResult) => {
          if (
            Array.isArray(subjectIds)
              ? subjectIds.includes(result.subject_id)
              : result.subject_id === subjectIds
          ) {
            return acc + result.correct_count - result.incorrect_count * 0.25
          }
          return acc
        }, 0) || 0
      )
    }

    // Calculate TYT nets
    const tytTurkishNet = calculateNetScore('TYT', tytTurkishId)
    const tytMathNet = calculateNetScore('TYT', tytMathId)
    const tytSocialNet = calculateNetScore('TYT', [
      tytHistoryId,
      tytGeographyId,
      tytReligionId,
      tytPhilosophyId,
    ])
    const tytScienceNet = calculateNetScore('TYT', [tytPhysicsId, tytChemistryId, tytBiologyId])

    // Calculate AYT nets
    const aytMathNet =
      calculateNetScore('AYT_Sayisal', aytMathScientificId) ||
      calculateNetScore('AYT_EsitAgirlik', aytMathEqualWeightId)

    const aytPhysicsNet = calculateNetScore('AYT_Sayisal', aytPhysicsId)
    const aytChemistryNet = calculateNetScore('AYT_Sayisal', aytChemistryId)
    const aytBiologyNet = calculateNetScore('AYT_Sayisal', aytBiologyId)

    const aytLiteratureNet =
      calculateNetScore('AYT_EsitAgirlik', aytLiteratureEqualWeightId) ||
      calculateNetScore('AYT_Sozel', aytLiteratureVerbalId)

    const aytHistory1Net =
      calculateNetScore('AYT_EsitAgirlik', aytHistory1EqualWeightId) ||
      calculateNetScore('AYT_Sozel', aytHistory1VerbalId)

    const aytGeography1Net =
      calculateNetScore('AYT_EsitAgirlik', aytGeography1EqualWeightId) ||
      calculateNetScore('AYT_Sozel', aytGeography1VerbalId)

    const aytHistory2Net = calculateNetScore('AYT_Sozel', aytHistory2Id)
    const aytGeography2Net = calculateNetScore('AYT_Sozel', aytGeography2Id)
    const aytPhilosophyNet = calculateNetScore('AYT_Sozel', aytPhilosophyId)
    const aytReligionNet = calculateNetScore('AYT_Sozel', aytReligionId)

    setRanking(
      getYKSRankTableData({
        grade: profile?.obp || 0,
        isGraduated: profile?.graduated || false,
        tyt: {
          turkishNet: tytTurkishNet || 0,
          mathNet: tytMathNet || 0,
          scienceNet: tytScienceNet || 0,
          socialStudiesNet: tytSocialNet || 0,
        },
        ayt: {
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
        },
      }),
    )
  }

  useEffect(() => {
    if (lastExamResults) calculateScores()
  }, [lastExamResults, profile])

  return (
    <div className="space-y-4">
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
              <td className="p-3">{ranking?.tyt.ham.toLocaleString()}</td>
              <td className="p-3">{ranking?.tyt.ham_sir.toLocaleString()}</td>
              <td className="p-3">{ranking?.tyt.yer.toLocaleString()}</td>
              <td className="p-3">{ranking?.tyt.yer_sir.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">SAY</td>
              <td className="p-3">{ranking?.say.ham.toLocaleString()}</td>
              <td className="p-3">{ranking?.say.ham_sir.toLocaleString()}</td>
              <td className="p-3">{ranking?.say.yer.toLocaleString()}</td>
              <td className="p-3">{ranking?.say.yer_sir.toLocaleString()}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-3 font-medium">EA</td>
              <td className="p-3">{ranking?.ea.ham.toLocaleString()}</td>
              <td className="p-3">{ranking?.ea.ham_sir.toLocaleString()}</td>
              <td className="p-3">{ranking?.ea.yer.toLocaleString()}</td>
              <td className="p-3">{ranking?.ea.yer_sir.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">SOZ</td>
              <td className="p-3">{ranking?.soz.ham.toLocaleString()}</td>
              <td className="p-3">{ranking?.soz.ham_sir.toLocaleString()}</td>
              <td className="p-3">{ranking?.soz.yer.toLocaleString()}</td>
              <td className="p-3">{ranking?.soz.yer_sir.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>* 2024 YKS verileri kullanılarak son TYT ve AYT denemenize göre hesaplanmıştır.</p>
        <p>
          * Diploma Notu: {profile?.obp || 0} puanı kullanılmıştır. Profil sayfasından obp puanını
          ve mezun durumunu değiştirebilirsin.
        </p>
      </div>
    </div>
  )
}

export default LastYKSRanking
