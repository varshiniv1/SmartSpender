import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../login';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react';

describe('Login Component', () => {
  let mockOnLogin;

  beforeEach(() => {
    // Mock the onLogin function before each test
    mockOnLogin = jest.fn();
  });

  test('renders login form', () => {
    render(
      <Router>
        <Login onLogin={mockOnLogin} />
      </Router>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeDisabled(); // Button initially disabled
  });

  test('enables the login button when inputs are filled', () => {
    render(
      <Router>
        <Login onLogin={mockOnLogin} />
      </Router>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(loginButton).not.toBeDisabled(); // Button enabled when inputs are valid
  });

  test('calls onLogin when form is submitted', () => {
    render(
      <Router>
        <Login onLogin={mockOnLogin} />
      </Router>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user input and form submission
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Verify onLogin is called with correct arguments
    expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
