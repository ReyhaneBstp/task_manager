import PageContainer from "../../components/page container/PageContainer";
import './signup.scss';
import { TextField, Button } from '@mui/material';
import CustomButton from "../../components/custom button/CustomButton";
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    id: '1',
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try {
      const response = await axios.post('http://localhost:3000/users', formData);
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
              variant="outlined"
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)', marginTop: '10px' },
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
              autoComplete="current-password"
              variant="outlined"
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)', marginTop: '10px' },
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
              variant="outlined"
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)', marginTop: '10px' },
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
              variant="outlined"
              onChange={handleInputChange}
              InputLabelProps={{
                style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)', marginTop: '10px' },
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
