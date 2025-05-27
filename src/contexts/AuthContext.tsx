
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // CEO Credentials - In production, these should be environment variables
  const CEO_USERNAME = 'wings_ceo_admin';
  const CEO_PASSWORD = 'WingsLtd2024@CEO!';

  useEffect(() => {
    // Check if admin is already logged in
    const adminSession = sessionStorage.getItem('wingsAdminAuth');
    const sessionTime = sessionStorage.getItem('wingsAdminTime');
    
    if (adminSession === 'authenticated' && sessionTime) {
      const loginTime = parseInt(sessionTime);
      const now = Date.now();
      // Session expires after 8 hours
      if (now - loginTime < 8 * 60 * 60 * 1000) {
        setIsAdminAuthenticated(true);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate secure login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (username === CEO_USERNAME && password === CEO_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('wingsAdminAuth', 'authenticated');
      sessionStorage.setItem('wingsAdminTime', Date.now().toString());
      
      // Log admin login for security
      await supabase.from('notifications').insert([{
        type: 'admin_login',
        title: 'Admin Dashboard Access',
        message: `CEO dashboard accessed at ${new Date().toLocaleString()}`,
        related_id: 'admin_login'
      }]);
      
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('wingsAdminAuth');
    sessionStorage.removeItem('wingsAdminTime');
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
