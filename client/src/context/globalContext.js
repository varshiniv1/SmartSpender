import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: token ? `Bearer ${token}` : '' };
  };

  const handleAuthError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const getIncomes = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/tran/get-incomes`, {
        headers: getAuthHeaders(),
      });
      setIncomes(data);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const getExpenses = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/tran/get-expenses`, {
        headers: getAuthHeaders(),
      });
      setExpenses(data);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}/tran/add-income`, income, {
        headers: getAuthHeaders(),
      });
      await getIncomes();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tran/delete-income/${id}`, {
        headers: getAuthHeaders(),
      });
      await getIncomes();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}/tran/add-expense`, expense, {
        headers: getAuthHeaders(),
      });
      await getExpenses();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tran/delete-expense/${id}`, {
        headers: getAuthHeaders(),
      });
      await getExpenses();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const totalIncome = () => incomes.reduce((total, i) => total + i.amount, 0);
  const totalExpenses = () => expenses.reduce((total, e) => total + e.amount, 0);
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 5);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getIncomes();
      getExpenses();
    }
  }, [getIncomes, getExpenses]);

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

export const useGlobalContext = () => useContext(GlobalContext);
