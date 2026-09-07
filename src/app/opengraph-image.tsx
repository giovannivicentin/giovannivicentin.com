import { ImageResponse } from 'next/og'
export const alt = 'Giovanni Vicentin — Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0a',
        color: '#fafafa',
        padding: '70px',
        border: '1px solid #333',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, color: '#a3a3a3' }}>
        Giovanni Vicentin / Software Engineer
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 76,
          letterSpacing: -4,
          marginTop: 76,
        }}
      >
        Interfaces. APIs.
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 76,
          letterSpacing: -4,
          color: '#999',
        }}
      >
        Production software.
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 22,
          marginTop: 'auto',
          borderTop: '1px solid #333',
          paddingTop: 24,
          justifyContent: 'space-between',
        }}
      >
        <span>React / Next.js / Node.js</span>
        <span>giovannivicentin.com</span>
      </div>
    </div>,
    size,
  )
}
