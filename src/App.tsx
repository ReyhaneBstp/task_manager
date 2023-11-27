import { BrowserRouter as Router, Route, Switch , Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { useAppContext } from './provider/AppContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/login/Login';
import Signup from './pages/sign up/Signup';
import Home from './pages/home/Home';
import { useEffect } from 'react';
import './App.css'
import { checkStoredToken } from './auth/AuthService';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const isUserAuthenticated = checkStoredToken();
  const {setAllUsers , setAllTasks , user , allTasks}=useAppContext();

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
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks?userId=${user.id}`);
        setAllTasks(response.data);
        console.log(allTasks);
        
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

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