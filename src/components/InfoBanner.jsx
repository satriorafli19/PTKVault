import { useState, useEffect } from 'react'
import { getBanner, isBannerDismissed, dismissBanner } from '../utils/storage'

const bannerStyle = {
  width: '100%', maxWidth: '720px', display: 'flex', alignItems: 'flex-start',
  gap: '10px', padding: '12px 16px', borderRadius: '12px',
  background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
  marginBottom: '20px'
}

const textStyle = {
  flex: 1, fontSize: '0.8rem', color: '#93c5fd', lineHeight: '1.5', margin: 0,
  whiteSpace: 'pre-wrap'
}

const closeBtn = {
  background: 'none', border: 'none', color: '#64748b',
  fontSize: '1rem', cursor: 'pointer', padding: '2px 4px', flexShrink: 0
}

export default function InfoBanner() {
  const [visible, setVisible] = useState(false)
  const [teks, setTeks] = useState('')

  useEffect(() => {
    const t = getBanner()
    if (t && !isBannerDismissed()) {
      setTeks(t)
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <div style={bannerStyle}>
      <p style={textStyle}>{teks}</p>
      <button style={closeBtn} onClick={() => { dismissBanner(); setVisible(false) }}>
        ✕
      </button>
    </div>
  )
}
