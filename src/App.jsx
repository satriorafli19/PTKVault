import { useState, useEffect } from 'react'
import logoAbsensi from './assets/logo-absensi.webp'
import logoChecklist from './assets/logo-checklist.webp'
import logoRuangan from './assets/logo-ruangan.webp'

const images = [
  'https://www.pertamina-ptk.com/files//dorong-kapal-tanker.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrG7RQlefhXCNMANvHf7SsdBTaQfa4Gvzhszt24eeCxw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkPXLYb4DZGbYkt3lQ95cpd5Od6E1LbQ6bO6-2lwbv6g&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy51B-9hipS62HrNFwglMvzKBA0gLAv3lQJugCM2FeOg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBzZPvtSor60mVXji4hYt9s2gweRNzKPe4IZkyxvYRBw&s=10'
]

const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

function App() {
  const [idx, setIdx] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    let count = 0
    images.forEach(src => {
      const img = new Image()
      img.onload = img.onerror = () => {
        count++
        if (count === images.length && !cancelled) setLoaded(true)
      }
      img.src = src
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!loaded) return
    const interval = setInterval(() => {
      setSliding(true)
      setTimeout(() => {
        setIdx(prev => (prev + 1) % images.length)
        setSliding(false)
      }, 1500)
    }, 5000)
    return () => clearInterval(interval)
  }, [loaded])

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    background: 'rgba(15,23,42,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  }

  const navLeft = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }

  const navLogo = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: '700'
  }

  const navTitle = {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0
  }

  const navDate = {
    fontSize: '0.75rem',
    color: '#94a3b8',
    margin: 0
  }

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    textAlign: 'center',
    padding: '80px 16px 40px',
    position: 'relative',
    overflow: 'hidden'
  }

  const bgBase = {
    position: 'fixed',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    willChange: 'transform'
  }

  const bgCurrentStyle = {
    ...bgBase,
    backgroundImage: `url(${images[idx]})`,
    transform: sliding ? 'translateX(-100%)' : 'translateX(0)',
    transition: 'transform 1.5s ease-in-out',
    zIndex: 0
  }

  const bgSlideStyle = {
    ...bgBase,
    backgroundImage: `url(${images[(idx + 1) % images.length]})`,
    transform: sliding ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 1.5s ease-in-out',
    zIndex: 0
  }

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    zIndex: 1
  }

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '560px'
  }

  const heroTagline = {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '30px 0 8px 0',
    lineHeight: '1.3'
  }

  const heroAccent = {
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }

  const heroSub = {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: '0 0 32px 0',
    fontWeight: 400
  }

  const dividerStyle = {
    width: '48px',
    height: '2px',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    border: 'none',
    borderRadius: '2px',
    margin: '0 auto 28px auto'
  }

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    width: '100%',
    justifyContent: 'center'
  }

  const cardBase = {
    flex: 1,
    aspectRatio: '3/4',
    backgroundColor: '#1e293b',
    borderRadius: '14px',
    padding: '28px 14px 20px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#ffffff',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #334155'
  }

  const iconBoxBase = {
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    flexShrink: 0
  }

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px'
  }

  const cardTitleStyle = {
    fontSize: '0.85rem',
    fontWeight: '600',
    margin: 0,
    color: '#ffffff'
  }

  const cardDescStyle = {
    fontSize: '0.68rem',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.3',
    fontWeight: 400
  }

  const heroQuote = {
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontStyle: 'italic',
    margin: '0 0 12px 0',
    lineHeight: '1.5',
    maxWidth: '460px'
  }

  const contactStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '36px'
  }

  const contactIcon = {
    fontSize: '1rem'
  }

  const contactLink = {
    color: '#60a5fa',
    fontSize: '0.85rem',
    fontWeight: '500',
    textDecoration: 'none'
  }

  const copyrightStyle = {
    fontSize: '0.7rem',
    color: '#475569',
    margin: '8px 0 0 0'
  }

  return (
    <>
      <nav style={navbarStyle}>
        <div style={navLeft}>
          <div style={navLogo}>PV</div>
          <p style={navTitle}>PTK Vault</p>
        </div>
        <p style={navDate}>{today}</p>
      </nav>

      <div style={containerStyle}>
        <div style={bgCurrentStyle} />
        <div style={bgSlideStyle} />
        <div style={overlayStyle} />
        <div style={contentStyle}>
          <h2 style={heroTagline}>
            Satu website untuk <span style={heroAccent}>direct</span> semuanya!
          </h2>
          <p style={heroQuote}>
            Sekarang ga usah ribet ribet buka website satu satu lewat link 
            karena sekarang satu link sudah bisa buka semua website nya
          </p>
          <p style={heroSub}>Pilih website admin yang ingin anda buka</p>
          <hr style={dividerStyle} />

          <div style={cardContainerStyle}>
            <a
              href="https://geotrans-h3pw.vercel.app/"
              style={cardBase}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                ...iconBoxBase,
                background: `rgba(59,130,246,0.15) url(${logoAbsensi}) center/contain no-repeat`
              }} />
              <div style={textContainerStyle}>
                <h2 style={cardTitleStyle}>Absensi Geotrans</h2>
                <p style={cardDescStyle}>
                  Kelola absensi Driver, OB, & Juru Parkir
                </p>
              </div>
            </a>

            <a
              href="https://checklist-car.vercel.app/"
              style={cardBase}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                ...iconBoxBase,
                background: `rgba(16,185,129,0.15) url(${logoChecklist}) center/contain no-repeat`
              }} />
              <div style={textContainerStyle}>
                <h2 style={cardTitleStyle}>Checklist Driver</h2>
                <p style={cardDescStyle}>
                  Kelola laporan kondisi kendaraan kantor
                </p>
              </div>
            </a>

            <a
              href="#"
              style={cardBase}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                ...iconBoxBase,
                background: `rgba(245,158,11,0.15) url(${logoRuangan}) center/contain no-repeat`
              }} />
              <div style={textContainerStyle}>
                <h2 style={cardTitleStyle}>Checklist Ruangan</h2>
                <p style={cardDescStyle}>
                  Kelola kondisi gedung
                </p>
              </div>
            </a>
          </div>

          <div style={contactStyle}>
            <span style={contactIcon}>📱</span>
            <a href={`https://wa.me/628561704149`} style={contactLink}>
              08561704149
            </a>
          </div>
          <p style={copyrightStyle}>
            &copy; Pertamina Trans Kontinental
          </p>
        </div>
      </div>
    </>
  )
}

export default App
