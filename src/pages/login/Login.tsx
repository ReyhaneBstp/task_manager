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
                        id="outlined-basic" 
                        variant="outlined"
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)' , marginTop:'10px'},
                            shrink: true,
                        }} 
                        />   
                    </div>

                    <div className='inputs-container'>
                        <TextField 
                        className='inputs' 
                        label="password"
                        id="filled-password-input" 
                        type="password" 
                        placeholder='password'
                        autoComplete="current-password" 
                        variant="outlined"
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)' , marginTop:'10px'},
                            shrink: true,
                        }}   
                        />
                    </div>
                    
                </form>
                
                <div className='button-box'>
                    <CustomButton button_title={"login"}></CustomButton>
                    <span>dont have any account?</span>
                </div>
            </div>
        </PageContainer>
    );
}

export default Login;