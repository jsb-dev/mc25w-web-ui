import '../public/index.css'
import CircularDial from './components/shared/CircularDial'

function App() {

  return (
    <main>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgb(50, 50, 50)',
      }}>
        <CircularDial />
      </div>
    </main>
  )
}

export default App
