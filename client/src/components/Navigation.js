import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../utils/icons';
import { menuItems } from '../utils/menuItems';
import axios from 'axios'; // Import Axios

function Navigation() {
    const navigate = useNavigate();

    const handleMenuClick = (path) => {
        navigate(path);
    };

    const handleSignOut = () => {
        console.log('Before sign out:', localStorage.getItem('token'));
        localStorage.removeItem('token');
        console.log('After sign out:', localStorage.getItem('token'));

        navigate('/'); // Redirect to the login page
    };

    const handleDownloadReport = async () => {
      try {
          const response = await axios.get('http://localhost:3001/api/report/download-report', {
              responseType: 'blob', // Ensure response is treated as a binary Blob
          });
  
          // Create a Blob URL for the PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'IncomeExpenseReport.pdf'); // Specify file name
          document.body.appendChild(link);
          link.click();
          link.remove(); // Clean up
        } catch (error) {
            console.error('Error downloading the report:', error);
        }
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
            <div className="text">
                <h2 className="text-primary" style={{ color: 'rgba(34, 34, 96, 1)' }}>
                    Smart Spender
                </h2>
            </div>
            <ul className="d-flex list-unstyled mb-0 gap-4">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => handleMenuClick(item.link)}
                        className="d-flex align-items-center cursor-pointer text-muted hover:text-primary hover:bg-light rounded px-2 py-1"
                        style={{ transition: 'all .4s ease-in-out', position: 'relative' }}
                    >
                        {item.icon}
                        <span className="ms-2">{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="d-flex align-items-center gap-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={handleDownloadReport}
                >
                    Download Report
                </button>
                <div
                    className="d-flex align-items-center cursor-pointer btn btn-outline-danger"
                    onClick={handleSignOut}
                >
                    {signout} <span className="ms-2">Sign Out</span>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;