import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { useAppContext } from './provider/AppContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/login/Login';
import Signup from './pages/sign up/Signup';
import Home from './pages/home/Home';
import './App.css'
import { checkStoredToken } from './auth/AuthService';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const isUserAuthenticated = checkStoredToken();
  const {isLogin} = useAppContext();
  console.log(isLogin);
  
  

  

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route>
              {isUserAuthenticated && isLogin ? <Redirect to="/todos" /> : <Login />}
            </Route>
            <Route exact path="/login" component={Signup} />
            <ProtectedRoute path="/todos" component={Home} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;