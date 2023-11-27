import PageContainer from "../../components/page container/PageContainer";
import './signup.scss';
import { TextField, Button } from '@mui/material';
import CustomButton from "../../components/custom button/CustomButton";
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from "../../provider/AppContext";
import { generateFakeToken  , isAuthenticated } from "../../auth/AuthService";

const Signup = () => {
  const {allUsers} = useAppContext();
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const validateInput = () => {
    let isValid = true;
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^(\d{2}\s?)?(\d{7,12})$/;
    
    if(formData.username === ''){
      setUsernameError(true);
      setUsernameErrorMsg('Username cannot be empty!');
      isValid = false;
    } 
    else if (/\d/.test(formData.username[0])) {
      setUsernameError(true);
      setUsernameErrorMsg('Username cannot start with a number!');
      isValid = false;
    }
    else {
      setUsernameError(false);
      setUsernameErrorMsg('');
    }

    if (formData.password === '') {
      setPasswordError(true);
      setPasswordErrorMsg('Password cannot be empty!');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMsg('');
    }

    if(formData.email === ''){
      setEmailError(true);
      setEmailErrorMsg('Email cannot be empty!');
      isValid = false;
    }
  
    else if (!emailPattern.test(formData.email) ) {
      setEmailError(true);
      setEmailErrorMsg('Please enter a valid email!');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
    }

    if(formData.phone === ''){
      setPhoneError(true);
      setPhoneErrorMsg('Phone number cannot be empty!');
      isValid = false;
    }
  
    else if (!phonePattern.test(formData.phone)) {
      setPhoneError(true);
      setPhoneErrorMsg('Please enter a valid phone number!');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMsg('');
    }
  
    return isValid;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const newFormData = {
      ...formData,
      id: uuidv4(),
    };
   
    try {

      const user = allUsers?.find(
        (user) =>user.username === newFormData.username
      );
      if (user) {
        console.log('Username already exists');
        return;
      }
   
      const response = await axios.post('http://localhost:3000/users', newFormData);
      const fakeToken = generateFakeToken(newFormData);
      localStorage.setItem('token', fakeToken);
      console.log('User signed up :', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
   };

  return (
    <PageContainer title={"Sign up"} page={""}>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className='inputs-container'>
            <TextField
              className='inputs'
              name="username"
              label="username"
              placeholder='username'
              variant="filled"
              onChange={handleInputChange}
              error={usernameError}
              helperText={usernameErrorMsg}
              InputLabelProps={{
                style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)' },
                shrink: true,
              }}
            />
          </div>

          <div className='inputs-container'>
          <TextField 
            className='inputs'
            label="password"
            type="password"
            name="password"
            placeholder='password'
            onChange={handleInputChange}
            variant="filled"
            error={passwordError}
            helperText={passwordErrorMsg}
            InputLabelProps={{
              style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)' },
              shrink: true,
            }}
        />
          </div>

          <div className='inputs-container'>
            <TextField
              className='inputs'
              label="email"
              name="email"
              placeholder='email'
              variant="filled"
              onChange={handleInputChange}
              error={emailError}
              helperText={emailErrorMsg}
              InputLabelProps={{
                style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)' },
                shrink: true,
              }}
            />
          </div>
          <div className='inputs-container'>
            <TextField
              className='inputs'
              label="phone"
              placeholder='phone'
              name="phone"
              variant="filled"
              onChange={handleInputChange}
              error={phoneError}
              helperText={phoneErrorMsg}
              InputLabelProps={{
                style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)' },
                shrink: true,
              }}
            />
          </div>


        </form>
        <div className='button-box'>
          <CustomButton button_title={"sign up"} onClick={handleSignUp}></CustomButton>
          <span className="account-text">do you have any account?</span>
        </div>
      </div>
    </PageContainer>
  );
}

export default Signup;
