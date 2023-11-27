import { createContext, useContext, ReactNode, useState , useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
interface AppContextType {
  user: User | null;
  setGlobalUser: (user: User | null) => void;
  isLogin: boolean;
  setLoginStatus: (status: boolean) => void;
  allUsers: User[] | null;
  setAllUsers: (users: User[] | null) => void;
  allTasks: Task[] | null;
  setAllTasks : (tasks:Task[] | null) => void;
}

interface User {
  username: string;
  email: string;
  phone:number;
  id:string;
}

interface Task {
  title: string;
  priority:number;
  status:boolean;
  id:string;
  userId:string;
}


const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const [user, setUser] = useState<User | null>(decodedToken);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [allTasks , setAllTasks] = useState<Task[] | null>(null);



  const setGlobalUser = (newUser: User | null) => {
    setUser(newUser);
  };


  const contextValue: AppContextType = {
    user,
    setGlobalUser,
    allUsers,
    setAllUsers,
    allTasks,
    setAllTasks,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
