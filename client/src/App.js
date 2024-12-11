import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Routes, Route, and Navigate
import Orb from './components/Orb';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expenses from './components/Expenses/expenses';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalContext } from './context/globalContext';
import Login from './login';
import Register from './register'; // Import Register component

function App() {
  const global = useGlobalContext();
  console.log(global);

  // Check if token exists in localStorage to determine if the user is logged in
  const token = localStorage.getItem('token');

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
      {orbMemo}
      <div className="container-fluid h-100">
        <div className="d-flex flex-column h-100">
          <Navigation />
          <main className="flex-fill bg-light bg-opacity-75 border border-white rounded-3 overflow-hidden">
            <Routes>
              {/* Default route is Login page, if not authenticated */}
              <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
              
              {/* If already logged in, redirect to dashboard */}
              <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
              
              {/* Register route */}
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/income" element={token ? <Income /> : <Navigate to="/login" />} />
              <Route path="/expenses" element={token ? <Expenses /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
