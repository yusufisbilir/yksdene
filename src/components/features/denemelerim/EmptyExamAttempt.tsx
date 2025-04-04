import { FileSpreadsheet } from 'lucide-react'

const EmptyExamAttempt = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg bg-muted/10 min-h-[200px]">
      <FileSpreadsheet className="w-12 h-12 mb-4 text-muted-foreground" />
      <h3 className="mb-2 text-xl font-medium">İlk Sınav Sonucunu ekle</h3>
      <p className="text-muted-foreground">
        "Deneme Ekle" butonuna tıkla. Bakalım kaç net çektin. 😎
      </p>
    </div>
  )
}

export default EmptyExamAttempt
