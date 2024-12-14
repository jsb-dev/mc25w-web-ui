import React, { useState, useCallback } from 'react';
import dial from '../../assets/dial.png';
import dialRim from '../../assets/dialRim.png';

interface CircularDialOverlayProps {
    rotation: number;
}

interface CircularDialProps {
    initialRotation?: number;
    onRotationChange?: (rotation: number) => void;
}

// CircularDialOverlay sub-component responsible for displaying the rotatable dial overlay
const CircularDialOverlay: React.FC<CircularDialOverlayProps> = ({ rotation }) => {
    return (
        <div >
            {/* Dial rim image that will rotate */}
            <img
                src={dialRim}
                alt="Dial Rim"
                style={{
                    transform: `rotate(${rotation}deg) scale(75%)`,
                    transition: 'transform 0.1s ease-out'
                }}
            />
        </div>
    );
};

// Main CircularDial component
const CircularDial: React.FC<CircularDialProps> = ({ initialRotation = 0 }) => {
    // State to track current rotation
    const [rotation, setRotation] = useState<number>(initialRotation);

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
            const newRotation = initialRotation + deltaX * 0.3;

            // Constrain rotation logic with nuanced handling
            setRotation(() => {

                // If rotation is less than 90, bump it up to 90
                // This prevents rotation below the left side constraint
                if (newRotation < 45) {
                    const finalRotation = Math.max(newRotation, 45);
                    return finalRotation;
                }

                if (newRotation > 315) {
                    const finalRotation = Math.min(newRotation, 315);
                    return finalRotation;
                }

                if (newRotation >= 45 && newRotation <= 315) {
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
        <div
            // Base dial background image
            style={{
                backgroundImage: `url(${dial})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'grab',
                transform: 'scale(25%)',
            }}
            // Add mouse interaction for rotation
            onMouseDown={handleRotation}
        >
            {/* Overlay dial with rotation */}
            <CircularDialOverlay rotation={rotation} />
        </div>
    );
};

export default CircularDial;