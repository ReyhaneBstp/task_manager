import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import './App.css'
import Create from './pages/create/Create';
import Signup from './pages/sign up/Signup';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App: React.FC = () => { 

  const isUserAuthenticated  : boolean= localStorage.getItem('isAuthenticated') === 'true';


  return (
    <ThemeProvider theme={theme}>
        <Router>
        <Switch>
          <Route exact path="/login">
            {isUserAuthenticated ? <Redirect to="/todos" /> : <Login />}
          </Route>
          <Route path="/todos">
            {isUserAuthenticated ? <Home /> :<Redirect to="/login" /> }
          </Route>
          <Route path="/create">
            {isUserAuthenticated ? <Create /> : <Redirect to="/login" /> }
          </Route>
          <Route exact path="/signup">
            {isUserAuthenticated ? <Redirect to="/todos" /> : <Signup/>}
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>

        </Router>
    </ThemeProvider>
  );
}

export default App;