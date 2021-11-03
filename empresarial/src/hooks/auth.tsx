import React, { createContext, useCallback, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from '../services/api';

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

  const signIn = useCallback(async ({ email, senha }) => {
    try {
      const response = await api.post('empresariais/login', {
        cpf: '',
        email,
        senha
      });

      const token = response.data;

      await AsyncStorage.setItem('token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const { data } = await api.get("empresariais/usuarios", { params: { logado: true } })

      const { id, nome, sobrenome, nivel } = data[0];

      await AsyncStorage.multiSet([
        ['id', id],
        ['nome', nome],
        ['sobrenome', sobrenome],
        ['email', email],
        ['nivel', String(nivel)],
      ]);
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '&usuario:token',
      '&usuario:id',
      '&usuario:nome',
      '&usuario:sobrenome',
      '&usuario:email',
      '&usuario:nivel'
    ]);

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








