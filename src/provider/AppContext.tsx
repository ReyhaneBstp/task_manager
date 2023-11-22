import { createContext, useContext, ReactNode, useState } from 'react';


interface AppContextType {
  user: User | null;
  setGlobalUser: (user: User | null) => void;
}

interface User {
  id: string;
  username: string;
  email: string;
  phone:number;
}


const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const setGlobalUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const contextValue: AppContextType = {
    user,
    setGlobalUser,
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
