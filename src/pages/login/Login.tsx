import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import PageContainer from '../../components/page container/PageContainer';
import CustomButton from '../../components/custom button/CustomButton';
import './login.scss'
import { useAppContext } from '../../provider/AppContext';
import { generateFakeToken } from '../../auth/AuthService';
import { useHistory } from 'react-router-dom';

interface User {
    username: string;
    password: string;
    email: string;
    phone:number;
    id:string;
}

const Login = () => {
    const [username, setUsername] = useState <string>('');
    const [password, setPassword] = useState <string>('');
    const {allUsers , setGlobalUser} = useAppContext() as {allUsers: User[] , setGlobalUser: React.Dispatch<React.SetStateAction<User>>};
    const history = useHistory();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);   
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value); 
    };
    const handleLogin = async () => {
    try {

        const user : ( User | undefined)  = allUsers?.find(
            (user) =>user.username === username && user.password === password
        );
        
        if (user) {
            const fakeToken = generateFakeToken(user);
            localStorage.setItem('token', fakeToken);
            localStorage.setItem('isAuthenticated', 'true');
            setGlobalUser(user);
            history.push('/todos');
            
        }
         else {
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
                    <CustomButton button_title={"login"} onClick={handleLogin}></CustomButton>
                    <span>dont have any account?</span>
                </div>
            </div>
        </PageContainer>
    );
}

export default Login;