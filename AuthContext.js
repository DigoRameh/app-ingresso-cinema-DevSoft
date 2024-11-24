import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Armazenando informações do usuário

  const login = (userInfo) => {
    setIsAuthenticated(true);
    setUser(userInfo); // Ao logar, configuramos as informações do usuário
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Limpar as informações do usuário ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
