import React, { useState } from 'react';
import onBinary from '../../assets/onBinary.png';
import offBinary from '../../assets/offBinary.png';

interface BinarySwitchProps {
    label?: string;
}

const BinarySwitch: React.FC<BinarySwitchProps> = ({ label }) => {
    const [state, setState] = useState(false);

    const toggleSwitch = () => {
        setState(!state);
    };

    return (
        <figure>
            <button onClick={toggleSwitch}>
                <div>
                    {state ? (
                        <img src={onBinary} alt="Switch On" />
                    ) : (
                        <img src={offBinary} alt="Switch Off" />
                    )}
                </div>
            </button>
            <figcaption>{label || 'Toggle'}</figcaption>
        </figure>
    );
};

export default BinarySwitch;