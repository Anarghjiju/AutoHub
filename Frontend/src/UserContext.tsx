// src/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the user data
interface User {
  uid: string;
  name: string;
  email: string;
  _id: string;
  phno: number;
  isAdmin:boolean;
}

// Create the UserContext with a default value
const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void; // Add a logout function type
}>({ user: null, setUser: () => {}, logout: () => {} });

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null); // Reset user state
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useUserContext = () => useContext(UserContext);
