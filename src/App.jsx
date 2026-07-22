import { useState, useEffect } from 'react'
import logoAbsensi from './assets/logo-absensi.webp'
import logoChecklist from './assets/logo-checklist.webp'
import logoRuangan from './assets/logo-ruangan.webp'
import PinAccess from './PinAccess'

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
  const [authenticated, setAuthenticated] = useState(false)
  const [adminName, setAdminName] = useState('')
  const [activePage, setActivePage] = useState('websites')
  const [idx, setIdx] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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

  const handleAuth = name => {
    setAdminName(name)
    setAuthenticated(true)
  }

  if (!authenticated) {
    return <PinAccess onSuccess={handleAuth} />
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

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '260px',
    zIndex: 11,
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(15,23,42,0.9)',
    backdropFilter: 'blur(16px)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    padding: '24px 0'
  }

  const sidebarBrand = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 20px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    marginBottom: '16px'
  }

  const sidebarLogo = {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: '700',
    flexShrink: 0
  }

  const sidebarTitle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0
  }

  const navList = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '0 12px',
    flex: 1
  }

  const navBtn = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: 'none',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease'
  }

  const navBtnActive = {
    ...navBtn,
    background: 'rgba(59,130,246,0.12)',
    color: '#60a5fa'
  }

  const navDot = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'currentColor',
    flexShrink: 0
  }

  const sidebarBottom = {
    padding: '16px 20px 0',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    marginTop: 'auto'
  }

  const adminNameStyle = {
    fontSize: '0.8rem',
    color: '#cbd5e1',
    fontWeight: '600',
    margin: '0 0 2px'
  }

  const sidebarDate = {
    fontSize: '0.7rem',
    color: '#475569',
    margin: 0
  }

  const bottomNavStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    zIndex: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    background: 'rgba(15,23,42,0.92)',
    backdropFilter: 'blur(16px)',
    borderTop: '1px solid rgba(255,255,255,0.06)'
  }

  const bottomBtn = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    padding: '6px 16px',
    cursor: 'pointer',
    color: '#94a3b8',
    fontSize: '0.65rem',
    transition: 'all 0.2s ease'
  }

  const bottomBtnActive = {
    ...bottomBtn,
    color: '#60a5fa'
  }

  const bottomDot = {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'currentColor'
  }

  const mainStyle = {
    position: 'relative',
    zIndex: 2,
    marginLeft: isMobile ? '0' : '260px',
    marginBottom: isMobile ? '64px' : '0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-start',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: isMobile ? '60px 16px 80px' : '80px 40px 40px',
    overflow: 'hidden'
  }

  const sectionStyle = {
    width: '100%',
    maxWidth: '720px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left'
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

  const heroQuote = {
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontStyle: 'italic',
    margin: '0 0 12px 0',
    lineHeight: '1.5',
    maxWidth: '500px'
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
    margin: '0 0 28px 0'
  }

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    width: '100%',
    justifyContent: 'flex-start'
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

  const perangkatTitle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 12px 0'
  }

  const perangkatSub = {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: '0 0 32px 0',
    maxWidth: '480px',
    lineHeight: '1.6'
  }

  const placeholderCard = {
    width: '100%',
    maxWidth: '480px',
    padding: '32px 24px',
    borderRadius: '14px',
    border: '1px dashed #334155',
    backgroundColor: 'rgba(30,41,59,0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  }

  const placeholderText = {
    fontSize: '0.8rem',
    color: '#475569',
    margin: 0,
    lineHeight: '1.5'
  }

  const contactStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    marginTop: '48px'
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
    margin: '8px 0 0 0',
    textAlign: 'left'
  }

  return (
    <>
      <div style={bgCurrentStyle} />
      <div style={bgSlideStyle} />
      <div style={overlayStyle} />

      {isMobile ? (
        <nav style={bottomNavStyle}>
          <button
            style={activePage === 'websites' ? bottomBtnActive : bottomBtn}
            onClick={() => setActivePage('websites')}
          >
            <div style={bottomDot} />
            Website
          </button>
          <button
            style={activePage === 'perangkat' ? bottomBtnActive : bottomBtn}
            onClick={() => setActivePage('perangkat')}
          >
            <div style={bottomDot} />
            Perangkat
          </button>
        </nav>
      ) : (
        <nav style={sidebarStyle}>
          <div style={sidebarBrand}>
            <div style={sidebarLogo}>PV</div>
            <p style={sidebarTitle}>PTK Vault</p>
          </div>

          <div style={navList}>
            <button
              style={activePage === 'websites' ? navBtnActive : navBtn}
              onClick={() => setActivePage('websites')}
            >
              <span style={navDot} />
              Kumpulan Website
            </button>
            <button
              style={activePage === 'perangkat' ? navBtnActive : navBtn}
              onClick={() => setActivePage('perangkat')}
            >
              <span style={navDot} />
              Sesi Perangkat
            </button>
          </div>

          <div style={sidebarBottom}>
            <p style={adminNameStyle}>{adminName}</p>
            <p style={sidebarDate}>{today}</p>
          </div>
        </nav>
      )}

      <main style={mainStyle}>
        {activePage === 'websites' ? (
          <section style={sectionStyle}>
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
                target="_blank"
                rel="noopener noreferrer"
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
                target="_blank"
                rel="noopener noreferrer"
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
                target="_blank"
                rel="noopener noreferrer"
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
              <a href="https://wa.me/628561704149" style={contactLink}>
                08561704149
              </a>
            </div>
            <p style={copyrightStyle}>
              &copy; Pertamina Trans Kontinental
            </p>
          </section>
        ) : (
          <section style={sectionStyle}>
            <h2 style={perangkatTitle}>Sesi Perangkat</h2>
            <p style={perangkatSub}>
              Kelola dan pantau sesi perangkat yang sedang aktif di lingkungan
              Pertamina Trans Kontinental
            </p>

            <div style={placeholderCard}>
              <span style={{ fontSize: '1.5rem', opacity: 0.2 }}>🖥️</span>
              <p style={placeholderText}>
                Fitur sesi perangkat akan segera tersedia
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default App
