import { render, screen, fireEvent } from "@testing-library/react";
import Button from "components/Button";


describe("Button Component", () => {
  test("renders the button with the correct name and icon", () => {
    render(<Button name="Click Me" icon="👍" />);

    const buttonElement = screen.getByText(/Click Me/i);
    const iconElement = screen.getByText(/👍/i);

    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  test("calls the onClick handler when clicked", () => {
    const mockOnClick = jest.fn();
    render(<Button name="Click Me" onClick={mockOnClick} />);

    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("renders a button element", () => {
    render(<Button name="Test Button" />);
    const buttonElement = screen.getByText(/Test Button/i);

    expect(buttonElement.tagName).toBe("BUTTON");
  });

  test("renders correctly with default props", () => {
    render(<Button name="Default Button" />);
    const buttonElement = screen.getByText(/Default Button/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toHaveAttribute("bRad"); // Assuming bRad is undefined by default
  });
});

