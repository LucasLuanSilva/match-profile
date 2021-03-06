import React, { createContext, useCallback, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from '../services/api';
import { Alert } from "react-native";

interface AuthState {
  token: string;
}

interface SigninCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  signIn(credentials: SigninCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token] = await AsyncStorage.multiGet([
        '&usuario:token',
      ]);
      if (token[1]) {
        setData({ token: token[1] })
      }
    }
    loadStorageData();
  }, [])

  const signIn = useCallback(async ({ email, senha }) => {
    try {
      const response = await api.post('login', {
        cpf: '',
        email,
        senha
      });

      const token = response.data;

      await AsyncStorage.setItem('token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await api.get("usuarios")
        .then(async res => {
          console.log(res.data)
          const user = res.data;

          await AsyncStorage.multiSet([
            ['id', user.id],
            ['nome', user.nome],
            ['sobrenome', user.sobrenome],
            ['email', user.email],
          ]);
        });
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('&usuario:token');

    api.defaults.headers.common['Authorization'] = null;
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be usd within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };








