import '../public/index.css';
import '../public/normalize.css';
import plate from './assets/plate.png'
import { InputGainDIal, OutputGainDIal, SaturationAmountDial, SoftClippingAmountDial } from './components/ui/Dials';
import { RMSToggle, PeakToggle } from './components/ui/Switches';

function App() {

  return (
    <main >
      <div style={{
        borderRadius: '100%',
        boxShadow: '0 0 55px 1px rgba(255, 255, 255, 0.75)',
      }}>
        <section style={{
          backgroundImage: `url(${plate})`,
        }}>
          <div style={{
            transform: 'translateX(20%) translateY(115px)',
          }}>
            <InputGainDIal />
          </div>
          <div style={{
            transform: 'translateX(35%) translateY(115px)',
          }}>
            <SaturationAmountDial />
          </div>
        </section>
      </div>
    </main >
  )
}

export default App
