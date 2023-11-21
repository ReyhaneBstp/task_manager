import { TextField, Button } from '@mui/material';
import PageContainer from '../../components/page container/PageContainer';
import CustomButton from '../../components/custom button/CustomButton';
import './login.scss'


const Login = () => {
    return (
        <PageContainer title={"Task Manager"}>
            <div className="login-container">
                <form className='login-form'>
                    <div className='inputs-container'>
                        <TextField
                        className='inputs'
                        label="username"
                        placeholder='username'
                        variant="filled"
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
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)'},
                            shrink: true,
                        }}   
                        />
                    </div>
                    
                </form>
                
                <div className='button-box'>
                    <div>
                        <CustomButton button_title={"login"}></CustomButton>
                    </div>
                    <span>dont have any account?</span>
                </div>
            </div>
        </PageContainer>
    );
}

export default Login;