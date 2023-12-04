import PageContainer from "../../components/page container/PageContainer";
import './signup.scss';
import { TextField, Button } from '@mui/material';
import CustomButton from "../../components/custom button/CustomButton";
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from "../../provider/AppContext";
import { generateFakeToken } from "../../auth/AuthService";
import { validateEmail , validatePassword , validatePhone , validateUsername } from "../../utilities/validateInputs";
import { useHistory } from 'react-router-dom';

interface User {
  username: string;
  password:string;
  email: string;
  phone:string;
  id:string;
}

const Signup :  React.FC = () => {
  const history = useHistory();
  const {allUsers} = useAppContext() as {allUsers : User[]};
  const [usernameError, setUsernameError]  = useState <boolean>(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState <string>('');
  const [passwordError, setPasswordError] = useState <boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState <string>('');
  const [emailError, setEmailError] = useState <boolean> (false);
  const [emailErrorMsg, setEmailErrorMsg] = useState <string>('');
  const [phoneError, setPhoneError] = useState <boolean>(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState <string>('');
  const [formData, setFormData] = useState <User>({
    username: '',
    password: '',
    email: '',
    phone: '',
    id:'',
  });

  const validateInput = () => {

    const usernameValidation = validateUsername(formData.username);
    const passwordValidation = validatePassword(formData.password);
    const emailValidation = validateEmail(formData.email);
    const phoneValidation = validatePhone(formData.phone);

    setUsernameError(!usernameValidation.isValid);
    setUsernameErrorMsg(usernameValidation.errorMessage);
    setPasswordError(!passwordValidation.isValid);
    setPasswordErrorMsg(passwordValidation.errorMessage);
    setEmailError(!emailValidation.isValid);
    setEmailErrorMsg(emailValidation.errorMessage);
    setPhoneError(!phoneValidation.isValid);
    setPhoneErrorMsg(phoneValidation.errorMessage);


    return (
      usernameValidation.isValid && passwordValidation.isValid && 
      emailValidation.isValid && phoneValidation.isValid 
    );
  };

  const goToLoigin :() => void = ()=>{
    history.push('/login'); 
}
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      history.push('./todos');
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
          <span onClick={goToLoigin} className="account-text">do you have any account?</span>
        </div>
      </div>
    </PageContainer>
  );
}

export default Signup;
