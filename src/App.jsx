function App() {
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // Gradasi Biru -> Merah -> Hijau
    background: 'linear-gradient(135deg, #007bff, #E31D2B, #28a745)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px'
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '15px 30px',
    backgroundColor: '#fff',
    color: '#E31D2B',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>PTK Vault</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
        Portal Resmi Installer Aplikasi Internal
      </p>
      <a 
        href="https://drive.google.com/drive/folders/1ZqSLIUMveHm5R8awv8yaXm5kkLXIZ0Cz?usp=sharing"
        style={buttonStyle}
      >
        Download Installer
      </a>
    </div>
  );
}

export default App;