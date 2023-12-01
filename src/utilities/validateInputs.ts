export interface ValidationResponse {
    isValid: boolean;
    errorMessage: string;
  }
  
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^(\d{2}\s?)?(\d{7,12})$/;
  
  export const validateUsername = (username: string): ValidationResponse => {
    if (username === '') {
      return { isValid: false, errorMessage: 'Username cannot be empty!' };
    } else if (/\d/.test(username[0])) {
      return { isValid: false, errorMessage: 'Username cannot start with a number!' };
    }
    return { isValid: true, errorMessage: '' };
  };
  
  export const validatePassword = (password: string): ValidationResponse => {
    if (password === '') {
      return { isValid: false, errorMessage: 'Password cannot be empty!' };
    }
    return { isValid: true, errorMessage: '' };
  };
  
  export const validateEmail = (email: string): ValidationResponse => {
    if (email === '') {
      return { isValid: false, errorMessage: 'Email cannot be empty!' };
    } else if (!emailPattern.test(email)) {
      return { isValid: false, errorMessage: 'Please enter a valid email!' };
    }
    return { isValid: true, errorMessage: '' };
  };
  
  export const validatePhone = (phone: string): ValidationResponse => {
    if (phone === '') {
      return { isValid: false, errorMessage: 'Phone number cannot be empty!' };
    } else if (!phonePattern.test(phone)) {
      return { isValid: false, errorMessage: 'Please enter a valid phone number!' };
    }
    return { isValid: true, errorMessage: '' };
  };