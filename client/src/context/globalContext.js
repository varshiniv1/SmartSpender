import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/tran/"; // Make sure the URL structure matches your backend

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Helper function to handle token expiration
  const handleTokenError = (err) => {
    if (err.response && err.response.status === 401) {
      // Token expired or invalid
      setError("Session expired. Please log in again.");
      localStorage.removeItem("token"); // Remove expired token
      window.location.href = "/login"; // Redirect to login page or perform any action
    } else {
      setError(err.response ? err.response.data.message : "An error occurred.");
    }
  };

  // Set up axios headers with JWT token
  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Ensure token is present
    },
  });

  // Fetch incomes from the backend
  const getIncomes = async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (err) {
      handleTokenError(err); // Handle errors (token expired, etc.)
    }
  };

  // Fetch expenses from the backend
  const getExpenses = async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (err) {
      handleTokenError(err); // Handle errors (token expired, etc.)
    }
  };

  // Add income
  const addIncome = async (income) => {
    try {
      await axiosInstance.post(`${BASE_URL}add-income`, income);
      getIncomes(); // Refresh the list of incomes after adding
    } catch (err) {
      handleTokenError(err); // Handle errors (token expired, etc.)
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes(); // Refresh the list of incomes after deletion
    } catch (err) {
      handleTokenError(err); // Handle errors (token expired, etc.)
    }
  };

  // Add expense
  const addExpense = async (expense) => {
    try {
      await axiosInstance.post(`${BASE_URL}add-expense`, expense);
      getExpenses(); // Refresh the list of expenses after adding
    } catch (err) {
      handleTokenError(err); // Handle errors (token expired, etc.)
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses(); // Refresh the list of expenses after deletion
    } catch (err) {
      handleTokenError(err); // Handle errors (token expired, etc.)
    }
  };

  // Calculate total income
  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // Calculate total expenses
  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Calculate total balance (income - expenses)
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Get the last 3 transactions (incomes + expenses)
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date (descending)
    return history.slice(0, 3); // Get the last 3 transactions
  };

  // Fetch data on initial load
  useEffect(() => {
    if (token) {
      getIncomes();
      getExpenses();
    } else {
      setError("Unauthorized: Please log in.");
    }
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
