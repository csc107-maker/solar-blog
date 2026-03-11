'use client'
import { useState } from 'react'
import StockChart from './StockChart'

const Tag = ({ children }: { children: string }) => (
  <span style={{
    display: 'inline-block', background: 'rgba(34,211,238,0.12)', color: '#22d3ee',
    borderRadius: 20, padding: '3px 12px', fontSize: 12, marginRight: 6, marginBottom: 6,
    border: '1px solid rgba(34,211,238,0.25)'
  }}>{children}</span>
)

const SectionTitle = ({ children, accent = '#22d3ee' }: { children: React.ReactNode; accent?: string }) => (
  <h2 style={{
    fontSize: '1.45rem', fontFamily: "'Noto Serif KR', serif", fontWeight: 700,
    color: '#f1f5f9', margin: '2.2rem 0 1rem',
    borderLeft: `4px solid ${accent}`, paddingLeft: 14, lineHeight: 1.4
  }}>{children}</h2>
)

const InfoBox = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(15,23,42,0.6) 100%)',
    border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12, padding: '18px 20px', marginBottom: 12
  }}>
    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
    <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem' }}>{title}</div>
    <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4, lineHeight: 1.6 }}>{desc}</div>
  </div>
)

const tags = [
  '#태양광지붕임대', '#RE100중소기업', '#공장지붕태양광', '#전기요금절감', '#지붕임대수익',
  '#태양광발전사업', '#재생에너지', '#한화솔루션', '#현대에너지솔루션', '#에너지전환',
  '#탄소중립경영', '#수출중소기업RE100', '#태양광투자', '#ESG경영', '#그린에너지'
]

const benefits = [
  { num: '①', title: '전기요금 20년 동결', body: '계약 체결 시점 단가를 20년간 고정. 향후 전기요금이 얼마나 오르든 동결 단가만 납부. 연평균 5% 인상 가정 시 20년 누적 절감액 수억 원 이상 예상.' },
  { num: '②', title: '초기 투자 0원', body: '태양광 패널 설치·인버터·전기공사 등 모든 설비 투자는 발전사업자 부담. 지붕 보유자는 단 1원도 투자하지 않아도 됩니다.' },
  { num: '③', title: '지붕 무상 보수', body: '계약 기간 20년 동안 방수, 도장, 균열 보수 등 지붕 유지관리 비용 전액 사업자 부담. 지붕 수명 연장 + 건물 자산가치 상승 효과.' },
]

const checklist = [
  ['🔍 지붕 구조 강도 확인', '태양광 패널 하중(약 15~20kg/㎡) 감당 여부를 전문 구조 진단으로 확인. 대부분의 철골·PC 구조 공장은 통과. 노후 슬라브 구조는 보강 공사 필요 여부 점검.'],
  ['📄 계약서 핵심 조항 검토', '단가 고정 범위(기본요금 포함 여부), 계약 해지 조건, 설비 소유권 귀속 시점, 사업자 폐업 시 보호 조항 등 반드시 법무사·변호사 검토 필수.'],
  ['🏢 사업자 신용도 확인', '20년 장기 계약인 만큼 사업자의 재무 건전성 확인 필수. 한화솔루션·HD현대에너지솔루션 등 대기업 계열사 또는 충분한 자본력을 갖춘 업체 선택 권장.'],
  ['⚡ 자가소비 비율 설계', '발전량의 자가소비 비율이 높을수록 절감 효과가 커짐. 한전 역송(매전) 수익은 지붕 보유자에게 일부 분배되는지 계약서상 명시 여부 확인.'],
  ['🔧 유지보수 범위 명확화', '지붕 보수의 구체적 범위(방수층, 도장, 하자 보수)와 주기를 계약서에 명시. 모호한 조항은 분쟁 소지 발생 가능.'],
]

const compareTable = [
  ['초기 투자비', '0원', '3억~20억 원 (규모별)'],
  ['전기요금', '20년 고정 단가', '시장가 변동 적용'],
  ['설비 소유권', '사업자 소유', '기업 직접 소유'],
  ['RE100 인증', '✅ 가능', '✅ 가능'],
  ['유지보수 책임', '사업자 부담', '기업 직접 부담'],
  ['지붕 보수', '무상 제공', '별도 비용 발생'],
  ['자금 부담', '없음', '대출·금융비용 발생'],
  ['적합 대상', '자금 여력 부족 중소기업', '자금 충분·장기 수익 원하는 기업'],
]

const steps = [
  ['STEP 1', '지붕 현황 파악', '지붕 면적(㎡), 건물 준공년도, 구조 형태(철골/PC/조적), 현재 전기요금 월 납부액을 정리합니다. 일반적으로 1,000㎡ 이상 지붕이면 사업자의 관심을 받을 수 있으며, 전기요금이 클수록 절감 효과도 큽니다.'],
  ['STEP 2', '복수 사업자 제안 비교', '한화솔루션, HD현대에너지솔루션, GS에너지, 민간 태양광 개발사 등 최소 3개 이상 사업자로부터 제안서를 받으세요. 단가, 계약 기간, 지붕 보수 범위, 해지 조건 등을 꼼꼼히 비교합니다.'],
  ['STEP 3', '법무·세무 검토 후 계약', '20년 장기 계약인 만큼 반드시 에너지 전문 법무사 또는 변호사의 계약서 검토를 거치세요. RE100 인증 절차, 전기요금 고정 단가의 세금계산서 처리 방식도 세무사와 확인하면 완벽합니다.'],
]

export default function BlogContent() {
  const [activeTab, setActiveTab] = useState<'hd' | 'hw'>('hd')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040d1a 0%, #0a1628 50%, #060e1c 100%)' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0d2137 0%, #0a1628 60%, #060e1c 100%)',
        borderBottom: '1px solid rgba(34,211,238,0.15)', padding: '56px 24px 40px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(0deg,#22d3ee,#22d3ee 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#22d3ee,#22d3ee 1px,transparent 1px,transparent 48px)'
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: 20, padding: '4px 16px', fontSize: 12, color: '#22d3ee', marginBottom: 18, letterSpacing: 1 }}>
            ☀️ 태양광 지붕임대 | RE100 솔루션
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontFamily: "'Noto Serif KR', serif",
            fontWeight: 700, color: '#f8fafc', lineHeight: 1.35, margin: '0 0 16px',
            textShadow: '0 0 40px rgba(34,211,238,0.2)'
          }}>
            공장·창고 지붕을 빌려주고<br />
            <span style={{ color: '#22d3ee' }}>20년간 전기요금을 동결</span>하는 법
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.7 }}>
            RE100 인증이 필요한 수출 중소기업 사장님,<br />
            지금 당장 지붕을 &lsquo;수익 자산&rsquo;으로 바꾸세요.<br />
            초기 투자 0원 · 전기요금 20년 고정 · 지붕 무상 보수까지
          </p>
          <div style={{ color: '#64748b', fontSize: 13 }}>✍️ 2026년 3월 11일 발행 | 에너지&amp;부동산 인사이트</div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px 60px' }}>

        {/* 해시태그 */}
        <div style={{ padding: '20px 0 4px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 32 }}>
          {tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>

        {/* 도입부 */}
        <div style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 14, padding: '22px 24px', marginBottom: 28 }}>
          <p style={{ margin: 0, lineHeight: 1.9, fontSize: '0.95rem', color: '#cbd5e1' }}>
            &ldquo;우리 공장 지붕, 그냥 놀리고 있어요.&rdquo; 많은 중소기업 대표님들이 하시는 말씀입니다.
            수천 평의 공장·창고 지붕이 햇빛만 맞으며 묵묵히 노화되고 있습니다.
            그런데 지금, 그 지붕이 <strong style={{ color: '#22d3ee' }}>20년짜리 &lsquo;전기요금 동결 계약서&rsquo;</strong>가 될 수 있습니다.
            초기 투자 한 푼 없이, 태양광 발전사업자가 지붕을 빌려 쓰는 대신 여러분의 전기요금을 20년간 고정해주고,
            지붕까지 무상으로 보수해줍니다. 이게 바로 지금 수출 중소기업들 사이에서 가장 빠르게 퍼지고 있는
            <strong style={{ color: '#22d3ee' }}> &lsquo;태양광 지붕임대 모델&rsquo;</strong>입니다.
          </p>
        </div>

        {/* Section 1 */}
        <SectionTitle>1. 왜 지금 지붕임대인가? — RE100의 압박</SectionTitle>
        <p style={{ lineHeight: 1.9, color: '#cbd5e1', fontSize: '0.93rem' }}>
          RE100(Renewable Energy 100%)은 기업이 사용하는 전력의 100%를 재생에너지로 충당하겠다는 글로벌 이니셔티브입니다.
          애플·구글·마이크로소프트·BMW 등 세계 400여 개 글로벌 기업들이 참여하고 있으며,
          이들은 자신의 공급망에 속한 협력사에도 RE100 이행을 요구하기 시작했습니다.
        </p>
        <p style={{ lineHeight: 1.9, color: '#cbd5e1', fontSize: '0.93rem', marginBottom: 20 }}>
          수출 의존도가 높은 국내 중소기업 입장에서는 RE100이 더 이상 &lsquo;선택&rsquo;이 아닌 &lsquo;생존 조건&rsquo;이 되었습니다.
          글로벌 바이어로부터 RE100 인증을 요구받는 사례가 급증하고 있으며,
          이를 충족하지 못하면 납품 자체가 거절되는 상황까지 벌어지고 있습니다.
          여기서 등장하는 해답이 바로 <strong style={{ color: '#22d3ee' }}>지붕 태양광 임대 모델</strong>입니다.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          <InfoBox icon="🌍" title="RE100 글로벌 가입 기업 수" desc="전 세계 400개 이상 기업 참여, 국내 삼성·SK·LG 등 대기업 포함 70여 곳 합류. 협력 중소기업으로 요구 범위 급속 확산 중" />
          <InfoBox icon="📦" title="공급망 탄소 규제 강화" desc="EU 탄소국경조정제도(CBAM) 2026년 본격 시행. 탄소 배출량 높은 제품은 수출 시 추가 관세 부담. 재생에너지 전환이 곧 수출 경쟁력" />
          <InfoBox icon="⚡" title="산업용 전기요금 상승세" desc="2023~2025년 산업용 전기요금 누적 35% 이상 인상. 전기 다소비 제조업 원가 압박 심화. 요금 고정화 니즈 폭발적 증가" />
          <InfoBox icon="🏭" title="국내 공장 지붕 잠재면적" desc="전국 공장·물류창고 지붕 면적 추정 2억㎡ 이상. 현재 태양광 활용률 5% 미만. 잠자는 자산의 재발견 시대 도래" />
        </div>

        {/* Section 2 */}
        <SectionTitle>2. 태양광 지붕임대 모델이란? — 핵심 구조 완전 해부</SectionTitle>
        <p style={{ lineHeight: 1.9, color: '#cbd5e1', fontSize: '0.93rem', marginBottom: 20 }}>
          태양광 지붕임대(Third Party Ownership, TPO) 모델은 공장·창고 지붕 보유자와 태양광 발전사업자가
          체결하는 장기 계약입니다. 발전사업자가 모든 설치·운영 비용을 부담하는 대신, 지붕 보유자에게 아래의 혜택을 제공합니다.
        </p>
        <div style={{ background: 'linear-gradient(135deg, #0d2137 0%, #0a1628 100%)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 16, padding: '28px 24px', marginBottom: 24 }}>
          <div style={{ textAlign: 'center', color: '#22d3ee', fontFamily: "'Noto Serif KR', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: 24 }}>
            🌟 지붕 보유자가 받는 3대 핵심 혜택
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {benefits.map(item => (
              <div key={item.num} style={{ background: 'rgba(34,211,238,0.07)', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', color: '#22d3ee', fontWeight: 700, marginBottom: 8 }}>{item.num}</div>
                <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9rem', marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.6 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <SectionTitle>3. 수출 중소기업에 왜 특히 유리한가?</SectionTitle>
        <p style={{ lineHeight: 1.9, color: '#cbd5e1', fontSize: '0.93rem' }}>
          일반적인 지붕 임대는 &lsquo;임대료&rsquo;를 받는 구조입니다. 하지만 수출 중소기업 사장님들에게 임대료는
          큰 메리트가 되지 않습니다. 월 50~100만 원 수준의 임대료보다,
          <strong style={{ color: '#22d3ee' }}> 매달 수백만 원씩 나가는 전기요금을 고정시키는 것</strong>이 훨씬 강력한 가치입니다.
        </p>
        <p style={{ lineHeight: 1.9, color: '#cbd5e1', fontSize: '0.93rem', marginBottom: 24 }}>
          예를 들어, 월 전기요금 3,000만 원을 내는 중소 제조업체가 있다고 가정해봅시다.
          지금 단가로 20년 계약을 맺으면, 전기요금이 매년 5%씩 오른다고 가정할 때
          20년 누적 절감액은 <strong style={{ color: '#22d3ee' }}>약 20억 원 이상</strong>이 됩니다.
          여기에 RE100 인증까지 받을 수 있으니, 글로벌 바이어 요구사항 충족 + 원가 절감 + 지붕 관리비 절감까지
          동시에 이뤄지는 셈입니다.
        </p>

        {/* Section 4 */}
        <SectionTitle>4. 계약 전 반드시 확인해야 할 체크리스트</SectionTitle>
        {checklist.map(([title, body]) => (
          <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ flex: '0 0 auto', color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem', minWidth: 180 }}>{title}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>{body}</div>
          </div>
        ))}

        {/* Section 5 — 주가 분석 */}
        <div style={{ margin: '36px 0 0', padding: '28px 0 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <SectionTitle accent="#f59e0b">5. 에너지 종목 분석 — 투자자 관점에서 바라본 태양광 산업</SectionTitle>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 20px' }}>
            지붕임대 사업의 성장성을 뒷받침하는 에너지 업계 대표 종목 두 가지를 분석합니다.
            이 두 기업의 방향성을 보면 태양광 지붕임대 시장이 왜 지금 가장 뜨거운지를 이해할 수 있습니다.
          </p>

          {/* 탭 */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4 }}>
            {(['hd', 'hw'] as const).map(key => (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                flex: 1, padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: activeTab === key ? (key === 'hd' ? 'rgba(34,211,238,0.15)' : 'rgba(245,158,11,0.15)') : 'transparent',
                color: activeTab === key ? (key === 'hd' ? '#22d3ee' : '#f59e0b') : '#64748b',
                fontWeight: activeTab === key ? 700 : 400, fontSize: '0.88rem',
                transition: 'all 0.2s', fontFamily: "'Noto Sans KR', sans-serif",
                borderBottom: activeTab === key ? `2px solid ${key === 'hd' ? '#22d3ee' : '#f59e0b'}` : '2px solid transparent'
              }}>
                {key === 'hd' ? '🔵 HD현대에너지솔루션 (322000)' : '🟡 한화솔루션 (009830)'}
              </button>
            ))}
          </div>

          {activeTab === 'hd' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[['현재 주가', '90,800원', '#22d3ee'], ['시가총액', '8,960억원', '#22d3ee'], ['EPS (TTM)', '2,743원', '#22d3ee'], ['상장일', '2019년', '#94a3b8']].map(([label, val, color]) => (
                  <div key={label} style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{label}</div>
                    <div style={{ color, fontWeight: 700, fontSize: '0.95rem' }}>{val}</div>
                  </div>
                ))}
              </div>
              <StockChart type="hd" />
              <div style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.12)', borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 10, fontSize: '0.92rem' }}>🔎 회사 분석 요약</div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.8, margin: 0 }}>
                  <strong style={{ color: '#cbd5e1' }}>HD현대에너지솔루션</strong>은 2016년 HD한국조선해양㈜의 그린에너지 사업부문이 현물출자로 설립된 태양광 전문 기업으로, 2019년 유가증권시장에 상장했습니다.
                  주택용·산업용·수상용·노면형 태양광 모듈을 제조·판매하며, 인버터·ESS·마이크로 파워스테이션과 시공·유지보수 서비스까지 통합 에너지 솔루션을 제공합니다.
                  2025년 기준 n-Type 고출력 제품 출시로 프리미엄 수요에 대응하고,
                  미국 RE100·24/7CFE 이행에 따른 상업용·유틸리티 수요 확대가 실적 개선을 이끌었습니다.
                  2026년 1분기 현재 주가 <strong style={{ color: '#22d3ee' }}>90,800원</strong> 수준으로, 상장 이후 꾸준한 우상향 흐름을 이어가고 있습니다.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'hw' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[['2025 매출', '13.3조원', '#f59e0b'], ['2025 영업손익', '-3,533억원', '#f87171'], ['2026 목표주가', '30,000~47,000원', '#f59e0b'], ['종목 코드', '009830', '#94a3b8']].map(([label, val, color]) => (
                  <div key={label} style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{label}</div>
                    <div style={{ color, fontWeight: 700, fontSize: '0.95rem' }}>{val}</div>
                  </div>
                ))}
              </div>
              <StockChart type="hw" />
              <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 10, fontSize: '0.92rem' }}>🔎 회사 분석 요약</div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.8, margin: 0 }}>
                  <strong style={{ color: '#cbd5e1' }}>한화솔루션</strong>은 태양광·케미칼·첨단소재 3개 부문을 운영하는 한화그룹 핵심 계열사입니다.
                  자회사 한화큐셀을 통해 미국 조지아주에 북미 최대 태양광 통합 생산단지 &lsquo;솔라 허브&rsquo;를 구축하며 현지 자급 체계를 선점했습니다.
                  2025년에는 연결기준 매출 <strong style={{ color: '#f59e0b' }}>13조 3,544억 원</strong>으로 역대 최대를 기록했으나,
                  미국 통관 지연과 글로벌 공급과잉 여파로 영업손실 3,533억 원을 기록했습니다.
                  그러나 2026년은 전환점이 될 것으로 전망됩니다. 미국 FEOC 규제 강화, 중국산 수출 보조금 폐지,
                  카터스빌 공장 수직계열화 완성으로 실적 흑자 전환이 기대됩니다.
                  2026년 태양광 출하량 목표 <strong style={{ color: '#f59e0b' }}>9GW</strong>, AMPC 세액공제 현금 수령액 <strong style={{ color: '#f59e0b' }}>약 9,500억 원</strong>이 예상됩니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 6 */}
        <SectionTitle accent="#a78bfa">6. 태양광 지붕임대 vs 직접 설치 — 무엇이 더 유리한가?</SectionTitle>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(167,139,250,0.1)' }}>
                {['구분', '지붕임대 (TPO)', '직접 설치 (자가)'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', color: '#a78bfa', textAlign: 'left', borderBottom: '1px solid rgba(167,139,250,0.2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareTable.map(([col1, col2, col3], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '10px 14px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{col1}</td>
                  <td style={{ padding: '10px 14px', color: '#22d3ee', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{col2}</td>
                  <td style={{ padding: '10px 14px', color: '#cbd5e1', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{col3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 7 */}
        <SectionTitle>7. 지금 바로 시작하는 3단계 실행 가이드</SectionTitle>
        {steps.map(([step, title, body]) => (
          <div key={step} style={{ display: 'flex', gap: 18, marginBottom: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '18px 20px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 auto', background: 'rgba(34,211,238,0.12)', color: '#22d3ee', borderRadius: 8, padding: '6px 12px', fontWeight: 700, fontSize: '0.82rem', marginTop: 2 }}>{step}</div>
            <div>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.92rem', marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>{body}</div>
            </div>
          </div>
        ))}

        {/* Section 8 */}
        <SectionTitle>8. 마무리 — 지붕은 짐이 아니라 자산입니다</SectionTitle>
        <div style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(10,22,40,0.8) 100%)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 16, padding: '24px 24px' }}>
          <p style={{ lineHeight: 1.9, color: '#cbd5e1', fontSize: '0.93rem', margin: '0 0 16px' }}>
            지금 이 순간에도 전국 수만 개의 공장과 창고 지붕이 아무런 역할 없이 햇빛과 비바람에 노출되어 있습니다.
            하지만 태양광 지붕임대 계약 하나로, 그 지붕은 <strong style={{ color: '#22d3ee' }}>20년짜리 전기요금 동결 계약서</strong>가 됩니다.
          </p>
          <p style={{ lineHeight: 1.9, color: '#cbd5e1', fontSize: '0.93rem', margin: '0 0 16px' }}>
            RE100을 요구받는 수출 중소기업 사장님께 드리는 메시지는 단 하나입니다.
            임대료보다 전기요금 절감이 더 크고, 지붕 관리비도 없어지며, 글로벌 바이어가 요구하는
            재생에너지 인증까지 받을 수 있는 이 구조를, 지금 검토하지 않을 이유가 없습니다.
          </p>
          <p style={{ lineHeight: 1.9, color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
            HD현대에너지솔루션과 한화솔루션이라는 국내 대표 에너지 기업들의 주가 흐름과 사업 확장 방향이
            보여주듯, 태양광 산업은 지금 전환점에 있습니다. 그 흐름의 출발점이 바로 여러분의 공장 지붕일 수 있습니다.
          </p>
        </div>

        {/* 면책 */}
        <div style={{ marginTop: 32, padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#475569', fontSize: '0.75rem', lineHeight: 1.7, margin: 0 }}>
            ⚠️ 본 블로그는 정보 제공 목적으로 작성되었으며, 투자 권유 또는 특정 상품 판매를 목적으로 하지 않습니다.
            주가 데이터는 참고용이며 실제 투자 결정 시 전문가 상담을 권장합니다.
          </p>
        </div>

        {/* 하단 해시태그 */}
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ color: '#64748b', fontSize: 11, marginBottom: 10, letterSpacing: 1 }}>TAGS</div>
          {['#태양광지붕임대', '#RE100', '#공장지붕태양광', '#전기요금절감20년', '#지붕임대수익',
            '#수출중소기업RE100', '#태양광발전사업', '#한화솔루션주가', '#HD현대에너지솔루션',
            '#재생에너지투자', '#탄소중립', '#ESG경영', '#그린에너지', '#CBAM대응', '#에너지전환'].map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </div>
  )
}
