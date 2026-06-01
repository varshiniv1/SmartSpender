import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Orb from './components/Orb';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expenses from './components/Expenses/expenses';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Register from './register';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      {orbMemo}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Navigation />
        <main
          style={{
            flexGrow: 1,
            marginTop: '1rem',
            background: 'rgba(252,246,249,0.6)',
            border: '3px solid #FFFFFF',
            backdropFilter: 'blur(4.5px)',
            borderRadius: '32px',
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/income" element={<PrivateRoute element={<Income />} />} />
            <Route path="/expenses" element={<PrivateRoute element={<Expenses />} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
