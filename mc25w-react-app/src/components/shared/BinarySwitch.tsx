import React, { useState } from 'react';
import onBinary from '../../assets/onBinary.png';
import offBinary from '../../assets/offBinary.png';

interface BinarySwitchProps {
    label?: string;
    initial?: boolean;
}

const BinarySwitch: React.FC<BinarySwitchProps> = ({ label, initial }) => {
    const [state, setState] = useState(initial || false);

    const toggleSwitch = () => {
        setState(!state);
    };

    return (
        <figure
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <button
                onClick={toggleSwitch}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '50px', // Adjust as needed
                        height: '50px', // Adjust as needed
                    }}
                >
                    <img
                        src={onBinary}
                        alt="Switch On"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transition: 'all 0.1s ease-in',
                            opacity: state ? 1 : 0,
                            pointerEvents: 'none',
                            boxShadow: '0 0 15px 5px rgba(255, 137, 0, 0.6), inset 0 0 15px 5px rgba(255, 137, 0, 0.3)',
                        }}
                    />
                    <img
                        src={offBinary}
                        alt="Switch Off"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transition: 'all 0.1s ease-out',
                            opacity: state ? 0 : 1,
                            pointerEvents: 'none',
                        }}
                    />
                </div>
            </button>
            <figcaption
                style={{
                    marginTop: '15%',
                    textAlign: 'center',
                }}
            >
                {label || 'Toggle'}
            </figcaption>
        </figure>
    );
};

export default BinarySwitch;
