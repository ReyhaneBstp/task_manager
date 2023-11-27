import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { KJUR } from 'jsrsasign';
import { useAppContext } from '../provider/AppContext';

const API_URL = 'http://localhost:3000';
const TOKEN_KEY = 'token';

interface Credentials {
  username: string;
  password: string;
  email: string;
  phone: string;
  id: string;
}

// export const login = async (credentials: Credentials): Promise<boolean> => {
//   try {
//     // const response = await axios.post<{ token: string }>(`${API_URL}/login`, credentials); 
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       localStorage.setItem(TOKEN_KEY, token);
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error('Error during login:', error);
//     return false;
//   }
// };

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  
  if (token !== null) {
    try {
      jwtDecode(token);
      // console.log('token', jwtDecode(token));
      return true;
    } catch(error) {
      return false;
    }
  }
  
  return false;
};

export const checkStoredToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? true : false;
};

const SECRET_KEY = 'my_secret_key';

export const generateFakeToken = (credentials: Credentials): string => {
  const header = { alg: "HS256", typ: "JWT" };
  const data = {
    username: credentials.username,
    email: credentials.email,
    phone: credentials.phone,
    id: credentials.id
  };
  const secret = SECRET_KEY;

  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(data);
  const sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);

  return sJWT;
};
