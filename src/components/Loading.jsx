// components/Loading.jsx
export default function Loading() {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <img 
          src="/assets/images/logo/IsotipoLogo.png" 
          alt="Cuterescue Logo" 
          style={styles.logo} 
        />
        <h2 style={styles.text}>Cargando...</h2>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: { textAlign: 'center' },
  logo: { width: '150px', animation: 'pulse 1.5s infinite ease-in-out' },
  text: { marginTop: '20px', fontFamily: 'sans-serif', color: '#333' }
};