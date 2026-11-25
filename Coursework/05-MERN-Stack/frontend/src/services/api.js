import axios from 'axios';

const API_USERS = '/api/users/';
const API_GOALS = '/api/goals/';

export const registerUser = async (userData) => {
  const response = await axios.post(API_USERS, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(API_USERS + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

const authConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getGoals = async (token) => {
  const response = await axios.get(API_GOALS, authConfig(token));
  return response.data;
};

export const createGoal = async (goalData, token) => {
  const response = await axios.post(API_GOALS, goalData, authConfig(token));
  return response.data;
};

export const deleteGoal = async (goalId, token) => {
  const response = await axios.delete(API_GOALS + goalId, authConfig(token));
  return response.data;
};