import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthResponse, User, LoginResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const [storedToken, storedUser] = await Promise.all([
        SecureStore.getItemAsync('token'),
        SecureStore.getItemAsync('user'),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loginContext(userData: { result: AuthResponse }) {
    console.debug('Logging in:', userData);
    const { token, user } = userData.result;
    // console.debug('User:', user);
    // console.debug('Token:', token);
    try {
      await Promise.all([
        SecureStore.setItemAsync('token', token),
        SecureStore.setItemAsync('user', JSON.stringify(user)),
      ]);
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  }

  async function logoutContext() {
    await Promise.all([
      SecureStore.deleteItemAsync('token'),
      SecureStore.deleteItemAsync('user'),
    ]);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: loginContext,
        logout: logoutContext,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};