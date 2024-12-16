import React, { useState, useCallback } from 'react';
import dial from '../../assets/dial.png';
import dialRim from '../../assets/dialRim.png';

interface CircularPercentDialOverlayProps {
    rotation: number;
}

interface CircularPercentDialProps {
    initialRotation?: number;
    label?: string;
    onRotationChange?: (rotation: number) => void;
}

const mapRotationToPercent = (newRotation: number): number => {
    // Ensure the rotation is within the allowed range
    if (newRotation < 45 || newRotation > 315) {
        throw new Error("newRotation must be between 45 and 315.");
    }

    // Map the rotation from [45, 315] to [0, 100]
    const minRotation = 45;
    const maxRotation = 315;

    // Normalize the rotation angle to a range of 0 to 1
    const normalizedRotation = (newRotation - minRotation) / (maxRotation - minRotation);

    // Map the normalized value to the percentage range
    const percentageValue = normalizedRotation * 100;

    // Round to 2 decimals
    return Math.round(percentageValue * 100) / 100;
};


///////////////// Components /////////////////

const CircularPercentDialOverlay: React.FC<CircularPercentDialOverlayProps> = ({ rotation }) => {
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

const CircularPercentDial: React.FC<CircularPercentDialProps> = ({ initialRotation, label }) => {
    // State to track current rotation
    const [rotation, setRotation] = useState<number>(initialRotation || 45);

    // The output value to be passed to JUCE
    const [percent, setPercent] = useState<number>(mapRotationToPercent(initialRotation || 45));

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
                    setPercent(0);
                    return 45;
                }

                if (newRotation > 315) {
                    setPercent(100);
                    return 315;
                }

                if (newRotation >= 45 && newRotation <= 315) {
                    setPercent(mapRotationToPercent(newRotation));
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
                min="0"
                max="100"
                value={percent}
                style={{
                    display: 'none',
                }}
                readOnly={true}
                aria-label="percent adjustment"
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                transform: 'translateX(-50%) translateY(-50%)',
                width: '100px',
                height: '100px',
            }}
            >
                <h2 style={{
                    position: 'absolute',
                    transform: 'translateY(-35px)'
                }}>{label || 'Amount'}</h2>
                <figure
                    style={{
                        backgroundImage: `url(${dial})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'grab',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        transform: 'scale(12%)',
                    }}
                    onMouseDown={handleRotation}
                >
                    <CircularPercentDialOverlay rotation={rotation} />
                    <figcaption style={{
                        position: 'absolute',
                        transform: 'translateY(350%)',
                        textAlign: 'center',
                        fontSize: '70px',
                    }}>
                        {percent} %
                    </figcaption>
                </figure>
            </div>
        </>
    );
};

export default CircularPercentDial;