import { useState } from 'react'

const KONTAK = [
  { label: 'Security', icon: '🛡️', nomor: '08561704149' },
  { label: 'HRD', icon: '👤', nomor: '08561704149' },
  { label: 'IT Support', icon: '💻', nomor: '08561704149' }
]

const overlay = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: '"Inter", sans-serif'
}

const modal = {
  background: '#1e293b', borderRadius: '16px', padding: '32px',
  width: '100%', maxWidth: '380px',
  border: '1px solid #334155'
}

const title = {
  fontSize: '1.1rem', fontWeight: '700', color: '#fff', margin: '0 0 16px'
}

const listStyle = {
  display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px'
}

const item = {
  display: 'flex', alignItems: 'center', gap: '12px',
  padding: '14px', borderRadius: '12px',
  background: 'rgba(15,23,42,0.6)', border: '1px solid #334155'
}

const iconBox = {
  width: '40px', height: '40px', borderRadius: '10px',
  background: 'rgba(59,130,246,0.12)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '1.1rem', flexShrink: 0
}

const infoStyle = {
  display: 'flex', flexDirection: 'column', gap: '2px'
}

const nameStyle = {
  fontSize: '0.8rem', fontWeight: '600', color: '#e2e8f0', margin: 0
}

const linkStyle = {
  fontSize: '0.75rem', color: '#60a5fa', textDecoration: 'none'
}

const btnClose = {
  width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155',
  background: 'transparent', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer'
}

export default function KontakDarurat({ onClose }) {
  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        <h2 style={title}>Kontak Darurat</h2>
        <div style={listStyle}>
          {KONTAK.map((k, i) => (
            <div key={i} style={item}>
              <div style={iconBox}>{k.icon}</div>
              <div style={infoStyle}>
                <p style={nameStyle}>{k.label}</p>
                <a href={`https://wa.me/62${k.nomor.slice(1)}`} style={linkStyle}
                   target="_blank" rel="noopener noreferrer">
                  {k.nomor}
                </a>
              </div>
            </div>
          ))}
        </div>
        <button style={btnClose} onClick={onClose}>Tutup</button>
      </div>
    </div>
  )
}
