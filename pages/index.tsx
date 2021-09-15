import type { GetServerSideProps } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmitForm(e: FormEvent){
    e.preventDefault()

    const data = {
      email,
      password
    }
    await signIn(data)
  }
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitForm} className={styles.form}>
        <input
          className={styles.input}
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit">Enviar</button>
      </form>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const cookies = parseCookies(ctx)

  if (cookies['nextauth.token']){
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  return {
    props: {

    }
  }
}