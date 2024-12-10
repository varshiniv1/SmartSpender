import { render, screen, fireEvent } from "@testing-library/react";
//import Income from "../src/components/Income.js";
import Income from "../components/Income.js";

import { useGlobalContext } from "../../../src/context/globalContext";

// Mock the `useGlobalContext` hook
//jest.mock("../../../src/context/globalContext");
//jest.mock("../../context/globalContext");
jest.mock("../context/globalContext");

describe("Income Component", () => {
  const mockGetIncomes = jest.fn();
  const mockDeleteIncome = jest.fn();
  const mockAddIncome = jest.fn();
  const mockTotalIncome = jest.fn(() => 2000);

  const mockContextValue = {
    incomes: [
      {
        _id: "1",
        title: "Freelance Work",
        amount: 1000,
        date: "2024-12-01",
        category: "Work",
        description: "Payment for project",
        type: "income",
      },
      {
        _id: "2",
        title: "Salary",
        amount: 2000,
        date: "2024-12-05",
        category: "Job",
        description: "Monthly salary",
        type: "income",
      },
    ],
    getIncomes: mockGetIncomes,
    deleteIncome: mockDeleteIncome,
    addIncome: mockAddIncome,
    totalIncome: mockTotalIncome,
  };

  beforeEach(() => {
    useGlobalContext.mockReturnValue(mockContextValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Income component with title and total income", () => {
    render(<Income />);
    expect(screen.getByText(/Incomes/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Income:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2000/i)).toBeInTheDocument();
  });

  test("calls `getIncomes` on component mount", () => {
    render(<Income />);
    expect(mockGetIncomes).toHaveBeenCalledTimes(1);
  });

  test("renders income items correctly", () => {
    render(<Income />);
    expect(screen.getByText(/Freelance Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment for project/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1000/i)).toBeInTheDocument();

    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly salary/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2000/i)).toBeInTheDocument();
  });

  test("calls `deleteIncome` when delete button is clicked", () => {
    render(<Income />);
    const deleteButtons = screen.getAllByText(/Delete/i);

    fireEvent.click(deleteButtons[0]); // Click the delete button for the first income
    expect(mockDeleteIncome).toHaveBeenCalledWith("1");

    fireEvent.click(deleteButtons[1]); // Click the delete button for the second income
    expect(mockDeleteIncome).toHaveBeenCalledWith("2");
  });
});

