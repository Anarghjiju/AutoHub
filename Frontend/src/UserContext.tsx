// src/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../src/firebase'; // Import your Firebase configuration
import { getAuth,onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut

// Define the shape of the user data
interface User {
  uid: string;
  name: string;
  email: string;
  _id: string;
  phno: number;
  isAdmin: boolean;
}

// Create the UserContext with a default value
const UserContext = createContext<{
  user: User | null;
  loading: boolean; // Add loading state to the context
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>; // Update logout function type to return a Promise
}>({ user: null, loading: true, setUser: () => {}, logout: async () => {} });

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Effect to check if user is authenticated
  useEffect(() => {
    const auth = getAuth(); // Get the Firebase auth instance
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      if (userCredential) {
        // User is signed in, fetch additional user data
        try {
          const response = await fetch(`http://localhost:3003/api/users/${userCredential.uid}`);
          const userData: User = await response.json();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false); // Set loading to false after the check is complete
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('User signed out successfully.');
      setUser(null);
      const currentUser = auth.currentUser; // Check current user after sign-out
      console.log('Current user after sign out:', currentUser);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}> {/* Provide loading state */}
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useUserContext = () => useContext(UserContext);
