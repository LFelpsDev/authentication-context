import { createContext, ReactNode, useState } from 'react';
import Router from 'next/router'
import {setCookie} from 'nookies'
import { api } from '../services/api'

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })
      const { token, refreshToken, permissions, roles } = response.data;

      // É Preciso manter as informação, mesmo quando o user atualiza a pagina
      // Para isso posso Utilizar o LocalStorage, SessionStorage ou Cookies

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,// 30 days -  o dando de tempo que ele vai ficar salva no meu navegador
        path: '/', // qual endereço terá acesso aos cookies, quando eu coloco barra quero dizer que qualquer endereço terá acesso
      })

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      Router.push('/dashboard')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}