import { useState, useEffect } from 'react'
import logoAbsensi from './assets/logo-absensi.webp'
import logoChecklist from './assets/logo-checklist.webp'
import logoRuangan from './assets/logo-ruangan.webp'
import PinAccess from './PinAccess'
import InfoBanner from './components/InfoBanner'
import GantiPin from './components/GantiPin'
import KontakDarurat from './components/KontakDarurat'
import { getLoginHistory } from './utils/storage'

const logoPtk = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvcYbsNekPXGzFrzVJPjAOvV06K2O0noTPBOXsNE9IZObomjjNkKx9LI&s=10'

const images = [
  'https://www.pertamina-ptk.com/files//dorong-kapal-tanker.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrG7RQlefhXCNMANvHf7SsdBTaQfa4Gvzhszt24eeCxw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkPXLYb4DZGbYkt3lQ95cpd5Od6E1LbQ6bO6-2lwbv6g&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy51B-9hipS62HrNFwglMvzKBA0gLAv3lQJugCM2FeOg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBzZPvtSor60mVXji4hYt9s2gweRNzKPe4IZkyxvYRBw&s=10'
]

const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
})

const CARDS = [
  { title: 'Absensi Geotrans', desc: 'Kelola absensi Driver, OB, & Juru Parkir', url: 'https://geotrans-h3pw.vercel.app/', logo: logoAbsensi, color: '#3b82f6' },
  { title: 'Checklist Driver', desc: 'Kelola laporan kondisi kendaraan kantor', url: 'https://checklist-car.vercel.app/', logo: logoChecklist, color: '#10b981' },
  { title: 'Checklist Ruangan', desc: 'Kelola kondisi gedung', url: '#', logo: logoRuangan, color: '#f59e0b' }
]

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [adminName, setAdminName] = useState('')
  const [activePage, setActivePage] = useState('websites')
  const [idx, setIdx] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [search, setSearch] = useState('')
  const [showGantiPin, setShowGantiPin] = useState(false)
  const [showKontak, setShowKontak] = useState(false)
  const [history, setHistory] = useState([])

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
    setHistory(getLoginHistory())
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setAdminName('')
    setActivePage('websites')
    setSearch('')
  }

  const openPage = page => {
    setActivePage(page)
    if (page === 'riwayat') setHistory(getLoginHistory())
  }

  if (!authenticated) {
    return <PinAccess onSuccess={handleAuth} />
  }

  const filtered = CARDS.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  )

  const bgBase = {
    position: 'fixed', inset: 0, backgroundSize: 'cover',
    backgroundPosition: 'center', willChange: 'transform'
  }

  const bgCurrentStyle = {
    ...bgBase, backgroundImage: `url(${images[idx]})`,
    transform: sliding ? 'translateX(-100%)' : 'translateX(0)',
    transition: 'transform 1.5s ease-in-out', zIndex: 0
  }

  const bgSlideStyle = {
    ...bgBase, backgroundImage: `url(${images[(idx + 1) % images.length]})`,
    transform: sliding ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 1.5s ease-in-out', zIndex: 0
  }

  const overlayStyle = {
    position: 'fixed', inset: 0,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', zIndex: 1
  }

  const sidebarStyle = {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px', zIndex: 11,
    display: 'flex', flexDirection: 'column',
    background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(16px)',
    borderRight: '1px solid rgba(255,255,255,0.06)', padding: '24px 0'
  }

  const sidebarBrand = {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '0 20px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    marginBottom: '16px'
  }

  const sidebarLogo = {
    width: '34px', height: '34px', borderRadius: '10px',
    background: 'rgba(59,130,246,0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, overflow: 'hidden'
  }

  const sidebarTitle = {
    fontSize: '1rem', fontWeight: '600', color: '#ffffff', margin: 0
  }

  const navList = {
    display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px', flex: 1
  }

  const navBtn = {
    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
    padding: '12px 14px', borderRadius: '10px', border: 'none',
    background: 'transparent', color: '#94a3b8', fontSize: '0.85rem',
    fontWeight: '500', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease'
  }

  const navBtnActive = { ...navBtn, background: 'rgba(59,130,246,0.12)', color: '#60a5fa' }
  const navDot = { width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', flexShrink: 0 }

  const sidebarDivider = {
    height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 12px'
  }

  const sidebarBottom = {
    padding: '16px 20px 0', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto'
  }

  const adminNameStyle = {
    fontSize: '0.8rem', color: '#cbd5e1', fontWeight: '600', margin: '0 0 2px'
  }

  const sidebarDate = {
    fontSize: '0.7rem', color: '#475569', margin: '0 0 10px'
  }

  const logoutBtn = {
    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
    padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.2)',
    background: 'rgba(239,68,68,0.08)', color: '#fca5a5', fontSize: '0.8rem',
    fontWeight: '500', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease'
  }

  const bottomNavStyle = {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: '64px', zIndex: 11,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
    background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(16px)',
    borderTop: '1px solid rgba(255,255,255,0.06)'
  }

  const bottomBtn = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    background: 'none', border: 'none', padding: '6px 12px', cursor: 'pointer',
    color: '#94a3b8', fontSize: '0.65rem', transition: 'all 0.2s ease'
  }

  const bottomBtnActive = { ...bottomBtn, color: '#60a5fa' }
  const bottomDot = { width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }

  const mainStyle = {
    position: 'relative', zIndex: 2, marginLeft: isMobile ? '0' : '260px',
    marginBottom: isMobile ? '64px' : '0', minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-start',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: isMobile ? '60px 16px 80px' : '80px 40px 40px',
    overflow: 'hidden'
  }

  const sectionStyle = {
    width: '100%', maxWidth: '720px',
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left'
  }

  const heroTagline = {
    fontSize: '1.6rem', fontWeight: '700', color: '#ffffff',
    margin: '30px 0 8px 0', lineHeight: '1.3'
  }

  const heroAccent = {
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  }

  const heroQuote = {
    fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic',
    margin: '0 0 12px 0', lineHeight: '1.5', maxWidth: '500px'
  }

  const heroSub = {
    fontSize: '0.85rem', color: '#64748b', margin: '0 0 32px 0', fontWeight: 400
  }

  const dividerStyle = {
    width: '48px', height: '2px',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    border: 'none', borderRadius: '2px', margin: '0 0 28px 0'
  }

  const searchInput = {
    width: '100%', padding: '12px 16px 12px 40px', borderRadius: '10px',
    border: '1px solid #334155', background: 'rgba(15,23,42,0.6)',
    color: '#fff', fontSize: '0.85rem', outline: 'none',
    boxSizing: 'border-box', marginBottom: '16px'
  }

  const searchWrap = { width: '100%', position: 'relative' }

  const searchIcon = {
    position: 'absolute', left: '14px', top: '13px',
    fontSize: '0.85rem', color: '#475569', pointerEvents: 'none'
  }

  const cardContainerStyle = {
    display: 'flex', flexDirection: 'row', gap: '12px',
    width: '100%', justifyContent: 'flex-start'
  }

  const cardBase = {
    flex: '1 1 0', minWidth: 0,
    backgroundColor: '#1e293b', borderRadius: '14px',
    padding: '28px 14px 20px', cursor: 'pointer', textDecoration: 'none',
    color: '#ffffff', transition: 'all 0.2s ease',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
    border: '1px solid #334155'
  }

  const iconBoxBase = {
    width: '64px', height: '64px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.2rem', flexShrink: 0
  }

  const textContainerStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'
  }

  const cardTitleStyle = {
    fontSize: '0.85rem', fontWeight: '600', margin: 0, color: '#ffffff'
  }

  const cardDescStyle = {
    fontSize: '0.68rem', color: '#64748b', margin: 0, lineHeight: '1.3', fontWeight: 400
  }

  const perangkatTitle = {
    fontSize: '1.4rem', fontWeight: '700', color: '#ffffff', margin: '0 0 12px 0'
  }

  const perangkatSub = {
    fontSize: '0.85rem', color: '#64748b', margin: '0 0 32px 0',
    maxWidth: '480px', lineHeight: '1.6'
  }

  const placeholderCard = {
    width: '100%', maxWidth: '480px', padding: '32px 24px',
    borderRadius: '14px', border: '1px dashed #334155',
    backgroundColor: 'rgba(30,41,59,0.4)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
  }

  const placeholderText = {
    fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: '1.5'
  }

  const contactStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
    gap: '8px', marginTop: '48px'
  }

  const contactIcon = { fontSize: '1rem' }

  const contactLink = {
    color: '#60a5fa', fontSize: '0.85rem', fontWeight: '500', textDecoration: 'none'
  }

  const copyrightStyle = {
    fontSize: '0.7rem', color: '#475569', margin: '8px 0 0 0', textAlign: 'left'
  }

  const riwayatTitle = {
    fontSize: '1.4rem', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0'
  }

  const riwayatSub = {
    fontSize: '0.85rem', color: '#64748b', margin: '0 0 24px 0',
    maxWidth: '480px', lineHeight: '1.6'
  }

  const tableStyle = {
    width: '100%', maxWidth: '720px', borderCollapse: 'collapse', fontSize: '0.8rem'
  }

  const thStyle = {
    padding: '10px 12px', borderBottom: '1px solid #334155', color: '#94a3b8',
    fontWeight: '600', textAlign: 'left', fontSize: '0.72rem',
    textTransform: 'uppercase', letterSpacing: '0.5px'
  }

  const tdStyle = {
    padding: '12px', borderBottom: '1px solid rgba(51,65,85,0.4)', color: '#e2e8f0'
  }

  const emptyStyle = {
    width: '100%', maxWidth: '720px', padding: '32px 24px',
    borderRadius: '14px', border: '1px dashed #334155',
    backgroundColor: 'rgba(30,41,59,0.4)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
  }

  const emptyText = {
    fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: '1.5'
  }

  return (
    <>
      <div style={bgCurrentStyle} />
      <div style={bgSlideStyle} />
      <div style={overlayStyle} />

      {showGantiPin && <GantiPin onClose={() => setShowGantiPin(false)} />}
      {showKontak && <KontakDarurat onClose={() => setShowKontak(false)} />}

      {isMobile ? (
        <nav style={bottomNavStyle}>
          <button style={activePage === 'websites' ? bottomBtnActive : bottomBtn}
            onClick={() => openPage('websites')}>
            <div style={bottomDot} /> Website
          </button>
          <button style={activePage === 'perangkat' ? bottomBtnActive : bottomBtn}
            onClick={() => openPage('perangkat')}>
            <div style={bottomDot} /> Perangkat
          </button>
          <button style={activePage === 'riwayat' ? bottomBtnActive : bottomBtn}
            onClick={() => openPage('riwayat')}>
            <div style={bottomDot} /> Riwayat
          </button>
        </nav>
      ) : (
        <nav style={sidebarStyle}>
          <div style={sidebarBrand}>
            <div style={sidebarLogo}>
              <img src={logoPtk} alt="PTK Vault" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={sidebarTitle}>PTK Vault</p>
          </div>

          <div style={navList}>
            <button style={activePage === 'websites' ? navBtnActive : navBtn}
              onClick={() => openPage('websites')}>
              <span style={navDot} /> Kumpulan Website
            </button>
            <button style={activePage === 'perangkat' ? navBtnActive : navBtn}
              onClick={() => openPage('perangkat')}>
              <span style={navDot} /> Sesi Perangkat
            </button>
            <button style={activePage === 'riwayat' ? navBtnActive : navBtn}
              onClick={() => openPage('riwayat')}>
              <span style={navDot} /> Riwayat Login
            </button>

            <div style={sidebarDivider} />

            <button style={navBtn} onClick={() => setShowKontak(true)}>
              <span style={{ fontSize: '1rem' }}>📞</span> Kontak Darurat
            </button>
            <button style={navBtn} onClick={() => setShowGantiPin(true)}>
              <span style={{ fontSize: '1rem' }}>🔒</span> Ganti PIN
            </button>
          </div>

          <div style={sidebarBottom}>
            <p style={adminNameStyle}>{adminName}</p>
            <p style={sidebarDate}>{today}</p>
            <button style={logoutBtn}
              onClick={handleLogout}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}>
              🚪 Logout
            </button>
          </div>
        </nav>
      )}

      <main style={mainStyle}>
        {activePage === 'websites' && (
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

            <InfoBanner />

            <div style={searchWrap}>
              <span style={searchIcon}>🔍</span>
              <input style={searchInput} type="text" placeholder="Cari website..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div style={cardContainerStyle}>
              {filtered.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.85rem', width: '100%', textAlign: 'center', padding: '20px 0' }}>
                  Tidak ada website yang cocok
                </p>
              ) : filtered.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                  style={cardBase}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#334155'
                    e.currentTarget.style.borderColor = c.color
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#1e293b'
                    e.currentTarget.style.borderColor = '#334155'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}>
                  <div style={{ ...iconBoxBase, background: `rgba(${parseInt(c.color.slice(1,3), 16)},${parseInt(c.color.slice(3,5), 16)},${parseInt(c.color.slice(5,7), 16)},0.15) url(${c.logo}) center/contain no-repeat` }} />
                  <div style={textContainerStyle}>
                    <h2 style={cardTitleStyle}>{c.title}</h2>
                    <p style={cardDescStyle}>{c.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            <div style={contactStyle}>
              <span style={contactIcon}>📱</span>
              <a href="https://wa.me/628561704149" style={contactLink}>08561704149</a>
            </div>
            <p style={copyrightStyle}>&copy; Pertamina Trans Kontinental</p>
          </section>
        )}

        {activePage === 'perangkat' && (
          <section style={sectionStyle}>
            <h2 style={perangkatTitle}>Sesi Perangkat</h2>
            <p style={perangkatSub}>
              Kelola dan pantau sesi perangkat yang sedang aktif di lingkungan
              Pertamina Trans Kontinental
            </p>
            <div style={placeholderCard}>
              <span style={{ fontSize: '1.5rem', opacity: 0.2 }}>🖥️</span>
              <p style={placeholderText}>Fitur sesi perangkat akan segera tersedia</p>
            </div>
          </section>
        )}

        {activePage === 'riwayat' && (
          <section style={sectionStyle}>
            <h2 style={riwayatTitle}>Riwayat Login</h2>
            <p style={riwayatSub}>Catatan login akun admin ke PTK Vault</p>

            {history.length === 0 ? (
              <div style={emptyStyle}>
                <span style={{ fontSize: '1.5rem', opacity: 0.2 }}>📋</span>
                <p style={emptyText}>Belum ada riwayat login</p>
              </div>
            ) : (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Device</th>
                    <th style={thStyle}>Browser</th>
                    <th style={thStyle}>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(h => (
                    <tr key={h.id}>
                      <td style={tdStyle}>{h.device}</td>
                      <td style={tdStyle}>{h.browser}</td>
                      <td style={tdStyle}>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
    </>
  )
}

export default App
