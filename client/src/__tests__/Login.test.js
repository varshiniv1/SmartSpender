import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../login';

test('renders login form', () => {
  render(<Login onLogin={() => {}} />);
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const button = screen.getByRole('button', { name: /login/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(button).toBeDisabled();
});

test('enables the login button when inputs are filled', () => {
  const mockOnLogin = jest.fn();
  render(<Login onLogin={mockOnLogin} />);

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const button = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(button).not.toBeDisabled();
});

test('calls onLogin when form is submitted', () => {
  const mockOnLogin = jest.fn();
  render(<Login onLogin={mockOnLogin} />);

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const button = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(button);

  expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'password123');
});
