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

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route>
            <ProtectedRoute path="/todos" component={Home} />
              {isUserAuthenticated ? <Redirect to="/todos" /> : <Login />}
            </Route>
            <Route exact path="/login" component={Login} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;