import { useState } from 'react'
import { getPin, setPin } from '../utils/storage'

const overlay = {
  position: 'fixed', inset: 0, zIndex: 999,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: '"Inter", sans-serif'
}

const modal = {
  background: '#1e293b', borderRadius: '16px', padding: '32px',
  width: '100%', maxWidth: '360px',
  border: '1px solid #334155'
}

const title = {
  fontSize: '1.1rem', fontWeight: '700', color: '#fff', margin: '0 0 20px'
}

const label = {
  fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 6px', display: 'block'
}

const input = {
  width: '100%', padding: '12px 14px', borderRadius: '10px',
  border: '1px solid #334155', background: '#0f172a', color: '#fff',
  fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
  marginBottom: '14px'
}

const btnRow = {
  display: 'flex', gap: '10px', marginTop: '6px'
}

const btnPrim = {
  flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  color: '#fff', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer'
}

const btnSec = {
  flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #334155',
  background: 'transparent', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer'
}

const error = {
  color: '#ef4444', fontSize: '0.75rem', margin: '-8px 0 14px'
}

const success = {
  color: '#34d399', fontSize: '0.75rem', margin: '-8px 0 14px'
}

export default function GantiPin({ onClose }) {
  const [oldPin, setOldPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [msg, setMsg] = useState(null)
  const [err, setErr] = useState(null)

  const handleSave = () => {
    if (oldPin !== getPin()) return setErr('PIN lama salah')
    if (newPin.length < 4) return setErr('PIN minimal 4 digit')
    if (newPin !== confirmPin) return setErr('PIN baru tidak cocok')
    setPin(newPin)
    setErr(null)
    setMsg('PIN berhasil diganti')
    setTimeout(onClose, 1200)
  }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        <h2 style={title}>Ganti PIN</h2>

        <label style={label}>PIN Lama</label>
        <input style={input} type="password" maxLength={6} value={oldPin}
          onChange={e => { setOldPin(e.target.value); setErr(null); setMsg(null) }} />

        <label style={label}>PIN Baru</label>
        <input style={input} type="password" maxLength={6} value={newPin}
          onChange={e => { setNewPin(e.target.value); setErr(null); setMsg(null) }} />

        <label style={label}>Konfirmasi PIN Baru</label>
        <input style={input} type="password" maxLength={6} value={confirmPin}
          onChange={e => { setConfirmPin(e.target.value); setErr(null); setMsg(null) }} />

        {err && <p style={error}>{err}</p>}
        {msg && <p style={success}>{msg}</p>}

        <div style={btnRow}>
          <button style={btnSec} onClick={onClose}>Batal</button>
          <button style={btnPrim} onClick={handleSave}>Simpan</button>
        </div>
      </div>
    </div>
  )
}
