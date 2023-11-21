import PageContainer from "../../components/page container/PageContainer";
import './signup.scss';
import { TextField, Button } from '@mui/material';
import CustomButton from "../../components/custom button/CustomButton";
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Signup = () => {
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
    if (formData.username === '') {
      setUsernameError(true);
      setUsernameErrorMsg('Username cannot be empty!');
      isValid = false;
    } else {
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

    if (formData.email === '') {
      setEmailError(true);
      setEmailErrorMsg('Email cannot be empty!');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
    }

    if (formData.phone === '') {
      setPhoneError(true);
      setPhoneErrorMsg('Phone number cannot be empty!');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMsg('');
    }

    return isValid;
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const newFormData = {
      ...formData,
      id: uuidv4(),
    };

    try {
      const existingUserResponse = await axios.get(`http://localhost:3000/users?username=${newFormData.username}`);
      if (existingUserResponse.data.length > 0) {
        console.log('Username already exists');
        return;
      }

      const response = await axios.post('http://localhost:3000/users', newFormData);
      console.log('User signed up:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
  

  return (
    <PageContainer title={"Sign up"}>
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
