import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail  // ← Add this import
} from 'firebase/auth';
import { auth } from '../firebase/config';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const signup = async (email, password, userData) => {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get Firebase token
      const token = await user.getIdToken();
      
      // Register user in backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          firebaseUid: user.uid,
          email: user.email,
          ...userData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // ← Add reset password function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  const getToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  const fetchUserRole = async (user) => {
    try {
      console.log('AuthContext: Getting token for user role fetch');
      const token = await user.getIdToken(true);
      console.log('AuthContext: Making API call to fetch user role');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('AuthContext: User role fetched successfully', response.data.role);
      setUserRole(response.data.role);
    } catch (error) {
      console.error('AuthContext: Error fetching user role:', error);
      if (error.response) {
        console.error('AuthContext: Response error:', error.response.status, error.response.data);
      }
      setUserRole('member'); // Default role
    }
  };

  useEffect(() => {
    console.log('AuthContext: Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('AuthContext: Auth state changed', user ? user.email : 'No user');
      setCurrentUser(user);
      if (user) {
        console.log('AuthContext: Fetching user role for', user.email);
        await fetchUserRole(user);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    getToken,
    resetPassword  // ← Add to exported values
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
