import React, { useState, useCallback } from 'react';
import dial from '../../assets/dial.png';
import dialRim from '../../assets/dialRim.png';

interface CircularGainDialOverlayProps {
    rotation: number;
}

interface CircularGainDialProps {
    initialRotation?: number;
    onRotationChange?: (rotation: number) => void;
}

const mapRotationToDecibels = (newRotation: number): number => {
    // Ensure the rotation is within the allowed range
    if (newRotation < 45 || newRotation > 315) {
        throw new Error("newRotation must be between 45 and 315.");
    }

    // Map the rotation from [45, 315] to [-50, +50]
    const minRotation = 45;
    const maxRotation = 315;
    const minDb = -50;
    const maxDb = 50;

    // Normalize the rotation angle to a range of 0 to 1
    const normalizedRotation = (newRotation - minRotation) / (maxRotation - minRotation);

    // Map the normalized value to the decibel range
    const decibelValue = minDb + normalizedRotation * (maxDb - minDb);

    // Round to 2 decimals
    return Math.round(decibelValue * 100) / 100;
};

///////////////// Components /////////////////

const CircularGainDialOverlay: React.FC<CircularGainDialOverlayProps> = ({ rotation }) => {
    return (
        <div >
            {/* Dial rim image that will rotate */}
            <img
                src={dialRim}
                alt="Dial Rim"
                style={{
                    transform: `translateY(4%) translateX(2%) rotate(${rotation}deg) scale(80%)`,
                    transition: 'transform 0.1s ease-out',
                    borderRadius: '100%',
                    boxShadow: '0 0 50px 5px rgb(0,0,0)',
                }}
            />
        </div>
    );
};

const CircularGainDial: React.FC<CircularGainDialProps> = ({ initialRotation }) => {
    // State to track current rotation
    const [rotation, setRotation] = useState<number>(initialRotation || 180);

    // The output value to be passed to JUCE
    const [gain, setGain] = useState<number>(mapRotationToDecibels(initialRotation || 0));

    // Handler for rotation that ensures rotation stays within 0-360 degrees
    const handleRotation = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        // Prevent default drag behaviors to ensure clean interaction
        event.preventDefault();

        // Capture the initial starting X position, tracking negative offsets
        const startX = event.clientX;

        // Track the initial rotation to establish a dynamic baseline
        const initialRotation = rotation;

        const onMouseMove = (moveEvent: MouseEvent) => {
            // Calculate delta relative to the original starting point
            const deltaX = moveEvent.clientX < 0 ? moveEvent.clientX + startX : moveEvent.clientX - startX;

            // Dynamically adjust rotation sensitivity and range
            const newRotation = initialRotation + deltaX * 0.55;

            // Constrain rotation logic with nuanced handling
            setRotation(() => {

                // If rotation is less than 90, bump it up to 90
                // This prevents rotation below the left side constraint
                if (newRotation < 45) {
                    setGain(-50);
                    return 45;
                }

                if (newRotation > 315) {
                    setGain(50);
                    return 315;
                }

                if (newRotation >= 45 && newRotation <= 315) {
                    setGain(mapRotationToDecibels(newRotation));
                    // Return the updated rotation
                    return newRotation;
                }

                return 0;
            });
        };

        const onMouseUp = () => {
            // Clean up event listeners to prevent memory leaks
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        // Add event listeners to track mouse movement
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [rotation]);
    return (
        <>
            <input
                type="range"
                min="-50"
                max="50"
                value={gain}
                style={{
                    display: 'none',

                }}
                aria-label="Gain adjustment"
            />
            <div
            >
                <figure
                    // Base dial background image
                    style={{
                        backgroundImage: `url(${dial})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'grab',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        transform: 'scale(25%)',
                    }}
                    // Add mouse interaction for rotation
                    onMouseDown={handleRotation}
                >
                    {/* Overlay dial with rotation */}
                    <CircularGainDialOverlay rotation={rotation} />
                    <figcaption style={{
                        position: 'absolute',
                        transform: 'scale(400%) translateY(350%)',
                        color: '#ffffff',
                        textAlign: 'center',
                    }}>
                        {gain} Db
                    </figcaption>
                </figure>
            </div>
        </>
    );
};

export default CircularGainDial;