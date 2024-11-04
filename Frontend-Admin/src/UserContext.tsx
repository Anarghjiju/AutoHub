import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import axios from 'axios';


interface User {
  uid: string;
  name: string;
  email: string;
  _id: string;
  phno: number;
  isAdmin: boolean;
}


const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}>({ user: null, setUser: () => {}, logout: () => {} });

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state


  useEffect(() => {
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user data from your backend using the Firebase UID
          const response = await axios.get(`http://localhost:3003/api/users/${firebaseUser.uid}`);
          const userData: User = response.data;
          setUser(userData); // Set user data in context
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null); // Clear user on error
        }
      } else {
        setUser(null); // No authenticated user
      }
      setLoading(false); // Set loading to false after fetching user
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const logout = () => {
    const auth = getAuth();
    auth.signOut().then(() => setUser(null)).catch(console.error);
    
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
