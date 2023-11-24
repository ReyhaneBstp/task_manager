import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import PageContainer from '../../components/page container/PageContainer';
import CustomButton from '../../components/custom button/CustomButton';
import './login.scss'
import axios from 'axios';
import { useAppContext } from '../../provider/AppContext';
import { generateFakeToken , login } from '../../auth/AuthService';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setLoginStatus , setGlobalUser } = useAppContext();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);   
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value); 
    };
    const handleLogin = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/users`);
        const users = await response.data; 
        const user = users.find(
            (user) =>user.username === username && user.password === password
        );
        
        if (user) {
            const fakeToken = generateFakeToken(user);
            localStorage.setItem('token', fakeToken);
            const isSuccess = await login(user);
           if(isSuccess){
               console.log('Login successful!');
           }
        } else {
        console.log('Login failed. Please check your username and password.');
        }

      
    } catch (error) {
        console.error('Error during login:', error);
    }
};
    
    return (
        <PageContainer title={"Task Manager"} page={""}>
            <div className="login-container">
                <form className='login-form'>
                    <div className='inputs-container'>
                        <TextField
                        className='inputs'
                        label="username"
                        placeholder='username'
                        variant="filled"
                        onChange={handleUsernameChange}
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)'},
                            shrink: true,
                        }} 
                        />   
                    </div>

                    <div className='inputs-container'>
                        <TextField 
                        className='inputs' 
                        label="password"
                        type="password" 
                        placeholder='password'
                        autoComplete="current-password" 
                        variant="filled"
                        onChange={handlePasswordChange}
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)'},
                            shrink: true,
                        }}   
                        />
                    </div>
                    
                </form>
                
                <div className='button-box'>
                    <div>
                        <CustomButton button_title={"login"} onClick={handleLogin}></CustomButton>
                    </div>
                    <span>dont have any account?</span>
                </div>
            </div>
        </PageContainer>
    );
}

export default Login;