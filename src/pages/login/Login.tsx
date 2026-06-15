import { TextField } from '@mui/material';
import { useState  , useEffect} from 'react';
import PageContainer from '../../components/page container/PageContainer';
import CustomButton from '../../components/custom button/CustomButton';
import './login.scss'
import { useAppContext } from '../../provider/AppContext';
import { generateFakeToken } from '../../auth/AuthService';
import { useHistory } from 'react-router-dom';
import { validateUsername , validatePassword } from '../../utilities/validateInputs';
import  axios  from 'axios';
import DeleteInput from '../../icons/DeleteInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { User } from '../../models/Users';



const Login = () => {
    const [username, setUsername] = useState <string>('');
    const [password, setPassword] = useState <string>('');
    const [showCloseIcon, setshowCloseIcon] = useState <boolean>(false);
    const [showPassword, setShowPassword] = useState <boolean>(false);
    const [usernameError, setUsernameError]  = useState <boolean>(false);
    const [usernameErrorMsg, setUsernameErrorMsg] = useState <string>('');
    const [passwordError, setPasswordError] = useState <boolean>(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState <string>('');
    const {allUsers , setGlobalUser , setAllUsers} = useAppContext() as {allUsers: User[] , setGlobalUser: React.Dispatch<React.SetStateAction<User>> , setAllUsers: React.Dispatch<React.SetStateAction<User[]>>};
    const history = useHistory();


    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://localhost:3000/users');
            setAllUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        fetchUsers();
      }, []);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);  
        if(e.target.value !== ''){
            setshowCloseIcon(true);
        } 
        else{
            setshowCloseIcon(false);
        }
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value); 
    };

    const handleDeleteInput : ()=> void =()=>{
        setUsername('');
        setshowCloseIcon(false);
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

    const goToSignup :() => void = ()=>{
        history.push('/signup'); 
    }

    const validateInput = () => {

        const usernameValidation = validateUsername(username);
        const passwordValidation = validatePassword(password);
    
        setUsernameError(!usernameValidation.isValid);
        setUsernameErrorMsg(usernameValidation.errorMessage);
        setPasswordError(!passwordValidation.isValid);
        setPasswordErrorMsg(passwordValidation.errorMessage);
    
        return (
          usernameValidation.isValid && passwordValidation.isValid
        );
    };
    const handleLogin = async () => {

    if (!validateInput()) {
        return;
        }
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
                    <div onClick={handleDeleteInput} className={`input-icon ${showCloseIcon ? 'show' : ''}`}>
                        <DeleteInput/>
                    </div>

                        <TextField
                        className='inputs'
                        label="username"
                        placeholder='username'
                        variant="filled"
                        error={usernameError}
                        helperText={usernameErrorMsg}
                        onChange={handleUsernameChange}
                        value={username}
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)'},
                            shrink: true,
                        }} 
                        sx={{ borderBottom: 'none' }}
                        />   
                    </div>

                    <div className='inputs-container'>
                    <div onClick={handleTogglePasswordVisibility} className={`password-icon ${showPassword ? 'show' : ''}`}>
                        <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            style={{ color: '#CAC4D0' , marginBottom:'8px'}} 
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </div>

                        <TextField 
                        className='inputs' 
                        label="password"
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='password'
                        autoComplete="current-password" 
                        variant="filled"
                        error={passwordError}
                        helperText={passwordErrorMsg}
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
                    <span onClick={goToSignup}>dont have any account?</span>
                </div>
            </div>
        </PageContainer>
    );
}

export default Login;