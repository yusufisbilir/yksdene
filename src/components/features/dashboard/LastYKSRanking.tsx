'use client'

import { useGetProfileQuery } from '@/features/profile.slice'
import { useGetLastExamResultsQuery } from '@/features/examResults.slice'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateTYTScores } from './calculate'

type YKSResult = {
  tytPuan: number
  sayPuan: number | null
  sozPuan: number | null
  eaPuan: number | null
  saySiralama: number | null
  sozSiralama: number | null
  eaSiralama: number | null
}

const tytTurkceId = 'ce164057-c0fb-4770-9951-bff7b6089537'
const tytMatematikId = '58017200-0ff0-4aad-9f37-f5235989dc67'
const tytFizikId = 'b4835e2c-cb12-4f58-9405-daada69fb473'
const tytKimyaId = '18400b98-faeb-4f7b-bc87-5f8d798e0e6b'
const tytBiyolojiId = '441fd0c8-dbea-4141-a89a-048e6330a1e4'
const tytTarihId = 'fbb509ba-431d-400f-bde4-c0f64c2c1508'
const tytCografyaId = 'b07f1bcc-2422-47e4-b56b-a5d1f413b0f7'
const tytFelsefeId = '8c22c4e2-8fa0-4d68-9dbd-6a423588de60'
const tytDinId = '6a897488-1ca9-407c-93ba-6ad502496448'

const LastYKSRanking = () => {
  const { data: profile } = useGetProfileQuery()
  const { data: lastExamResults } = useGetLastExamResultsQuery()
  const [tytResult, setTytResult] = useState<{ rawScore: number; placementScore: number } | null>(
    null,
  )

  const calculateTYT = () => {
    const tytTurkceCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytTurkceId)
        ?.correct_count ?? 0
    const tytTurkceIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytTurkceId)
        ?.incorrect_count ?? 0
    const tytMatematikCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytMatematikId)
        ?.correct_count ?? 0
    const tytMatematikIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytMatematikId)
        ?.incorrect_count ?? 0
    const tytFizikCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytFizikId)
        ?.correct_count ?? 0
    const tytFizikIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytFizikId)
        ?.incorrect_count ?? 0
    const tytFizikNet = tytFizikCorrect - tytFizikIncorrect * 0.25
    const tytKimyaCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytKimyaId)
        ?.correct_count ?? 0
    const tytKimyaIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytKimyaId)
        ?.incorrect_count ?? 0
    const tytKimyaNet = tytKimyaCorrect - tytKimyaIncorrect * 0.25
    const tytBiyolojiCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytBiyolojiId)
        ?.correct_count ?? 0
    const tytBiyolojiIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytBiyolojiId)
        ?.incorrect_count ?? 0
    const tytBiyolojiNet = tytBiyolojiCorrect - tytBiyolojiIncorrect * 0.25
    const tytTarihCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytTarihId)
        ?.correct_count ?? 0
    const tytTarihIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytTarihId)
        ?.incorrect_count ?? 0
    const tytTarihNet = tytTarihCorrect - tytTarihIncorrect * 0.25
    const tytCografyaCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytCografyaId)
        ?.correct_count ?? 0
    const tytCografyaIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytCografyaId)
        ?.incorrect_count ?? 0
    const tytCografyaNet = tytCografyaCorrect - tytCografyaIncorrect * 0.25
    const tytDinCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytDinId)
        ?.correct_count ?? 0
    const tytDinIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytDinId)
        ?.incorrect_count ?? 0
    const tytDinNet = tytDinCorrect - tytDinIncorrect * 0.25
    const tytFelsefeCorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytFelsefeId)
        ?.correct_count ?? 0
    const tytFelsefeIncorrect =
      lastExamResults?.TYT?.subjectResults.find((result) => result.subject_id === tytFelsefeId)
        ?.incorrect_count ?? 0
    const tytFelsefeNet = tytFelsefeCorrect - tytFelsefeIncorrect * 0.25

    const tytTurkceNet = tytTurkceCorrect - tytTurkceIncorrect * 0.25
    const tytMatematikNet = tytMatematikCorrect - tytMatematikIncorrect * 0.25
    const tytSosyalNet = tytTarihNet + tytCografyaNet + tytDinNet + tytFelsefeNet
    const tytFenNet = tytFizikNet + tytKimyaNet + tytBiyolojiNet

    console.log(tytTurkceNet, tytMatematikNet, tytSosyalNet, tytFenNet)

    if (tytTurkceNet || tytMatematikNet || tytSosyalNet || tytFenNet) {
      const tytResult = calculateTYTScores({
        turkishNet: tytTurkceNet,
        mathNet: tytMatematikNet,
        scienceNet: tytSosyalNet,
        socialStudiesNet: tytFenNet,
        grade: profile?.obp || 0,
        isGraduated: profile?.graduated || false,
      })
      setTytResult(tytResult)
    }
  }

  useEffect(() => {
    if (lastExamResults) calculateTYT()
  }, [lastExamResults])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">2024 YKS Puan ve Sıralama</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <span>TYT ham puanı: {tytResult?.rawScore}</span>
          <span>TYT yerleştirme puanı: {tytResult?.placementScore}</span>
        </div>
        {/* <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-3 text-left">Puan Türü</th>
                <th className="p-3 text-left">Ham Puan</th>
                <th className="p-3 text-left">Ham Sıralama</th>
                <th className="p-3 text-left">Yerleştirme Puanı</th>
                <th className="p-3 text-left">Yerleştirme Sıralama</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-3 font-medium">TYT</td>
                <td className="p-3">{yksResult.tytPuan.toFixed(3)}</td>
                <td className="p-3">-</td>
                <td className="p-3">{yksResult.tytPuan.toFixed(3)}</td>
                <td className="p-3">-</td>
              </tr>
              {yksResult.sayPuan && (
                <tr className="bg-white">
                  <td className="p-3 font-medium">SAY</td>
                  <td className="p-3">{yksResult.sayPuan.toFixed(3)}</td>
                  <td className="p-3">-</td>
                  <td className="p-3">{yksResult.sayPuan.toFixed(3)}</td>
                  <td className="p-3">{yksResult.saySiralama?.toLocaleString()}</td>
                </tr>
              )}
              {yksResult.eaPuan && (
                <tr className="bg-gray-100">
                  <td className="p-3 font-medium">EA</td>
                  <td className="p-3">{yksResult.eaPuan.toFixed(3)}</td>
                  <td className="p-3">-</td>
                  <td className="p-3">{yksResult.eaPuan.toFixed(3)}</td>
                  <td className="p-3">{yksResult.eaSiralama?.toLocaleString()}</td>
                </tr>
              )}
              {yksResult.sozPuan && (
                <tr className="bg-white">
                  <td className="p-3 font-medium">SÖZ</td>
                  <td className="p-3">{yksResult.sozPuan.toFixed(3)}</td>
                  <td className="p-3">-</td>
                  <td className="p-3">{yksResult.sozPuan.toFixed(3)}</td>
                  <td className="p-3">{yksResult.sozSiralama?.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}

        <div className="mt-4 text-xs text-muted-foreground">
          <p>* 2024 YKS verileri kullanılarak hesaplanmıştır.</p>
          <p>* OBP: {profile?.obp || 0} puan kullanılmıştır.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default LastYKSRanking
