import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { AppProvider } from './provider/AppContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/login/Login';
import Signup from './pages/sign up/Signup';
import Home from './pages/home/Home';
import './App.css'


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
import { checkStoredToken } from './auth/AuthService';

function App() {
  const isUserAuthenticated = checkStoredToken();

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <Switch>
            <Route path="/login">
              {isUserAuthenticated ? <Redirect to="/todos" /> : <Login />}
            </Route>
            <Route path="/signup" component={Signup} />
            <ProtectedRoute path="/todos" component={Home} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;