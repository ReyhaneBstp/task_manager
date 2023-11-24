import { createContext, useContext, ReactNode, useState } from 'react';


interface AppContextType {
  user: User | null;
  setGlobalUser: (user: User | null) => void;
  isLogin: boolean;
  setLoginStatus: (status: boolean) => void;
}

interface User {
  username: string;
  email: string;
  phone:number;
  id:string;
}


const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const setGlobalUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const setLoginStatus = (status: boolean) => {
    setIsLogin(status);
  };

  const contextValue: AppContextType = {
    user,
    isLogin,
    setGlobalUser,
    setLoginStatus,
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
