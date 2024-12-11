import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { signout } from '../utils/icons'; 
import { menuItems } from '../utils/menuItems';

function Navigation() {
  const navigate = useNavigate(); // Create navigate function from useNavigate

  const handleMenuClick = (path) => {
    navigate(path);  // Navigate to the given path
  };

  return (
    <nav className="p-3 w-100 d-flex justify-content-between align-items-center" style={{ background: 'rgba(252, 246, 249, 0.78)', border: '3px solid #FFFFFF', backdropFilter: 'blur(4.5px)', borderRadius: '32px' }}>
      
      {/* Title on the left */}
      <div className="text">
        <h2 className="text-primary" style={{ color: 'rgba(34, 34, 96, 1)' }}>Smart Spender</h2>
      </div>

      {/* Menu items horizontally aligned */}
      <ul className="d-flex list-unstyled mb-0 gap-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleMenuClick(item.path)}  // Call handleMenuClick with path
            className="d-flex align-items-center cursor-pointer text-muted"
            style={{ transition: 'all .4s ease-in-out', position: 'relative' }}
          >
            {item.icon}
            <span className="ms-2">{item.title}</span>
          </li>
        ))}
      </ul>

      {/* Signout button on the right */}
      <div className="d-flex align-items-center cursor-pointer">
        {signout} <span className="ms-2">Sign Out</span>
      </div>
    </nav>
  );
}

export default Navigation;
