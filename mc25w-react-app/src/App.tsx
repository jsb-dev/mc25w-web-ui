import '../public/index.css'
import plate from './assets/plate.png'
import { InputGainDIal, OutputGainDIal, SaturationAmountDial, SoftClippingAmountDial } from './components/ui/Dials';
import { RMSToggle, PeakToggle } from './components/ui/Switches';

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
        padding: '0',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        transform: 'scale(150%)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '30%'
        }}>
          <InputGainDIal />
          <SaturationAmountDial />
        </div>
      </section>
    </main >
  )
}

export default App
