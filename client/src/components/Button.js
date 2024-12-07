import React from 'react';

function Button({ name, icon, onClick, variant, size, bRad }) {
    // Bootstrap button variant (e.g., "primary", "secondary", etc.)
    const buttonClass = `btn btn-${variant} btn-${size} ${bRad ? `rounded-${bRad}` : ''}`;

    return (
        <button 
            className={buttonClass} 
            onClick={onClick}
        >
            {icon}
            {name}
        </button>
    );
}

export default Button;
