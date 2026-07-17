import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vishwaa Shah — AI Engineer & Software Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#080c12',
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 20% 10%, rgba(77,124,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 80% 80%, rgba(124,92,252,0.16) 0%, transparent 70%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#4d7cff',
            marginBottom: 28,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 84,
            fontWeight: 700,
            color: '#f0f4ff',
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Vishwaa Shah
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: 'rgba(240,244,255,0.65)',
            marginTop: 24,
          }}
        >
          AI Engineer &amp; Software Builder
        </div>
      </div>
    ),
    { ...size }
  )
}
