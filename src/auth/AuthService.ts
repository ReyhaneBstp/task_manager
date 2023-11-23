import axios from 'axios';

const API_URL = 'http://localhost:3001';
const TOKEN_KEY = 'token';

interface Credentials {
  username: string;
  password: string;
  email:string;
  phone:number;
  id:string;
}

export const login = async (credentials: Credentials): Promise<boolean> => {
  try {
    const response = await axios.post<{ token: string }>(`${API_URL}/login`, credentials);
    const token = response.data.token;

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};
