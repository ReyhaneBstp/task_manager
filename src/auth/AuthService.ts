import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { KJUR } from 'jsrsasign';


const API_URL = 'http://localhost:3000';
const TOKEN_KEY = 'token';

interface Credentials {
  username: string;
  password: string;
  email: string;
  phone: string;
  id: string;
}

interface JWTToken {
  username: string;
  email: string;
  phone: string;
  id: string;
  iat: number;
  exp: number;
}

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (token !== null) {
    try {
      const decodedToken: JWTToken = jwtDecode(token);
      return true;
    } catch(error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  }
  
  return false;
};

export const checkStoredToken = (): boolean => {
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
