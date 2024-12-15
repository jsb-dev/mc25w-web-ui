import '../public/index.css'
import CircularGainDial from './components/shared/CircularGainDial'
import BinarySwitch from './components/shared/BinarySwitch'
import plate from './assets/plate.png'

function App() {

  return (
    <main style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: 'rgb(50, 50, 50)',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <section style={{
        backgroundImage: `url(${plate})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '329px',
        width: '434px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        transform: 'scale(150%)',
      }}>
        <CircularGainDial initialRotation={180} />
        <BinarySwitch label="Toggle" initial={false} />
      </section>
    </main >
  )
}

export default App
