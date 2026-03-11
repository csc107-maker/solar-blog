'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const hdData = [
  { date: '23.1Q', price: 42000 }, { date: '23.2Q', price: 48500 },
  { date: '23.3Q', price: 55000 }, { date: '23.4Q', price: 51000 },
  { date: '24.1Q', price: 58000 }, { date: '24.2Q', price: 63000 },
  { date: '24.3Q', price: 70000 }, { date: '24.4Q', price: 75000 },
  { date: '25.1Q', price: 82000 }, { date: '25.2Q', price: 88000 },
  { date: '25.3Q', price: 85000 }, { date: '25.4Q', price: 92000 },
  { date: '26.1Q', price: 90800 },
]

const hwData = [
  { date: '23.1Q', price: 41000 }, { date: '23.2Q', price: 38000 },
  { date: '23.3Q', price: 35000 }, { date: '23.4Q', price: 37000 },
  { date: '24.1Q', price: 34000 }, { date: '24.2Q', price: 31000 },
  { date: '24.3Q', price: 29000 }, { date: '24.4Q', price: 33000 },
  { date: '25.1Q', price: 31000 }, { date: '25.2Q', price: 55000 },
  { date: '25.3Q', price: 42000 }, { date: '25.4Q', price: 28000 },
  { date: '26.1Q', price: 36000 },
]

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
  color: string
}

const CustomTooltip = ({ active, payload, label, color }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0d1117', border: `1px solid ${color}`, borderRadius: 8, padding: '8px 14px' }}>
        <p style={{ color, margin: 0, fontSize: 12 }}>{label}</p>
        <p style={{ color: '#fff', margin: 0, fontWeight: 700 }}>{payload[0].value.toLocaleString()}원</p>
      </div>
    )
  }
  return null
}

interface Props { type: 'hd' | 'hw' }

export default function StockChart({ type }: Props) {
  const isHD = type === 'hd'
  const data = isHD ? hdData : hwData
  const color = isHD ? '#22d3ee' : '#f59e0b'
  const gradId = isHD ? 'hdGrad' : 'hwGrad'

  return (
    <div style={{ background: 'rgba(13,17,23,0.8)', borderRadius: 14, padding: '20px 10px 10px', marginBottom: 20 }}>
      <div style={{ color, fontWeight: 700, fontSize: '0.9rem', marginBottom: 16, paddingLeft: 10 }}>
        📈 {isHD ? 'HD현대에너지솔루션' : '한화솔루션'} 분기별 주가 추이 (2023~2026)
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v: number) => `${(v / 10000).toFixed(0)}만`} />
          <Tooltip content={<CustomTooltip color={color} />} />
          <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2.5}
            fill={`url(#${gradId})`} dot={{ fill: color, r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
