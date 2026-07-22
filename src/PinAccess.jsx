import { useState } from 'react'

const APP_PIN = '1234'

const containerStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}

const cardStyle = {
  background: 'rgba(30,41,59,0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '20px',
  padding: '48px 40px 40px',
  width: '100%',
  maxWidth: '380px',
  textAlign: 'center'
}

const logoBox = {
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '1.1rem',
  fontWeight: '700',
  margin: '0 auto 16px'
}

const titleStyle = {
  fontSize: '1.3rem',
  fontWeight: '700',
  color: '#ffffff',
  margin: '0 0 4px'
}

const subtitleStyle = {
  fontSize: '0.8rem',
  color: '#64748b',
  margin: '0 0 32px'
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid #334155',
  background: 'rgba(15,23,42,0.6)',
  color: '#ffffff',
  fontSize: '1.5rem',
  textAlign: 'center',
  letterSpacing: '8px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s'
}

const inputFocusStyle = {
  ...inputStyle,
  borderColor: '#3b82f6'
}

const btnStyle = {
  width: '100%',
  padding: '14px',
  marginTop: '16px',
  borderRadius: '12px',
  border: 'none',
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  color: '#ffffff',
  fontSize: '0.9rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'opacity 0.2s'
}

const errorStyle = {
  color: '#ef4444',
  fontSize: '0.8rem',
  margin: '12px 0 0'
}

export default function PinAccess({ onSuccess }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pin === APP_PIN) {
      onSuccess('Satrio Rafli')
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={logoBox}>PV</div>
        <h1 style={titleStyle}>PTK Vault</h1>
        <p style={subtitleStyle}>Masukkan PIN untuk mengakses</p>

        <form onSubmit={handleSubmit}>
          <input
            style={focused ? inputFocusStyle : inputStyle}
            type="password"
            maxLength={6}
            value={pin}
            onChange={e => {
              setPin(e.target.value)
              setError(false)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="****"
            autoFocus
          />
          <button
            style={btnStyle}
            type="submit"
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Masuk
          </button>
        </form>

        {error && <p style={errorStyle}>PIN salah, coba lagi</p>}
      </div>
    </div>
  )
}
