import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '공장·창고 지붕으로 전기요금 20년 동결하는 법 | 태양광 지붕임대 완전 가이드',
  description: 'RE100 인증이 필요한 수출 중소기업을 위한 태양광 지붕임대 완전 가이드. 초기 투자 0원, 전기요금 20년 고정, 지붕 무상 보수까지. 현대에너지솔루션·한화솔루션 주가 분석 포함.',
  keywords: '태양광지붕임대, RE100, 공장지붕태양광, 전기요금절감, 수출중소기업, 한화솔루션, 현대에너지솔루션',
  openGraph: {
    title: '공장·창고 지붕을 빌려주고 전기요금 20년 동결하는 법',
    description: '태양광 지붕임대로 RE100 인증 + 전기요금 절감 + 지붕 무상 보수를 동시에!',
    type: 'article',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
