import '../public/index.css'
// import CircularGainDial from './components/shared/CircularGainDial'
import BinarySwitch from './components/shared/BinarySwitch'

function App() {

  return (
    <main>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'rgb(50, 50, 50)',
        margin: 0,
        padding: 0,
      }}>
        {/* <CircularGainDial /> */}
        <BinarySwitch label="Switch" />
      </div>
    </main>
  )
}

export default App
