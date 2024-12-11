import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../utils/useWindowSize.js';

// Define keyframes for animation
const moveOrb = (width, height) => `
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(${width}px, ${height / 2}px);
    }
    100% {
        transform: translate(0, 0);
    }
`;

function Orb() {
    const { width, height } = useWindowSize();
    const [style, setStyle] = useState({});

    // Update the animation dynamically based on window size
    useEffect(() => {
        const animation = moveOrb(width, height);
        setStyle({
            width: '70vh',
            height: '70vh',
            position: 'absolute',
            borderRadius: '50%',
            marginLeft: '-37vh',
            marginTop: '-37vh',
            background: 'linear-gradient(180deg, #F56692 0%, #F2994A 100%)',
            filter: 'blur(400px)',
            animation: `${animation} 15s alternate linear infinite`
        });
    }, [width, height]);

    return <div className="orb" style={style} />;
}

export default Orb;
