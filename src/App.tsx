import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { useAppContext } from './provider/AppContext';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { useEffect } from 'react';
import './App.css'
import axios from 'axios';
import Create from './pages/create/Create';
import Signup from './pages/sign up/Signup';
import Edit from './pages/edit/Edit';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App: React.FC = () => { 

  const isUserAuthenticated  : boolean= localStorage.getItem('isAuthenticated') === 'true';
  const {setAllUsers}=useAppContext();
  

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
          <Route path="/edit">
            {isUserAuthenticated ? <Edit /> : <Redirect to="/login" /> }
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>

        </Router>
    </ThemeProvider>
  );
}

export default App;