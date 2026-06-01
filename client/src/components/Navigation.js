import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signout } from '../utils/icons';
import { menuItems } from '../utils/menuItems';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="p-3 w-100 d-flex justify-content-between align-items-center"
      style={{
        background: 'rgba(252, 246, 249, 0.78)',
        border: '3px solid #FFFFFF',
        backdropFilter: 'blur(4.5px)',
        borderRadius: '32px',
      }}
    >
      <div>
        <h2 style={{ color: 'rgba(34, 34, 96, 1)', margin: 0 }}>Smart Spender</h2>
      </div>

      <ul className="d-flex list-unstyled mb-0 gap-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(item.path)}
            className="d-flex align-items-center gap-2"
            style={{
              cursor: 'pointer',
              color: location.pathname === item.path ? 'rgba(34, 34, 96, 1)' : '#6c757d',
              fontWeight: location.pathname === item.path ? '700' : '400',
              transition: 'all .3s ease-in-out',
            }}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>

      <div
        className="d-flex align-items-center gap-2"
        style={{ cursor: 'pointer', color: '#6c757d' }}
        onClick={handleSignOut}
      >
        {signout}
        <span>Sign Out</span>
      </div>
    </nav>
  );
}

export default Navigation;
