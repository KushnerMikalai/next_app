import React from 'react'
import { GetServerSideProps } from 'next'
// import { getCsrfToken } from 'next-auth/client'
import { getProviders, signIn } from 'next-auth/client'

interface Provider {
    name: string
    id: string
}

interface Props {
    providers: Provider[]
}

const SignIn: React.FC<Props> = ({ providers }) => {
  return (
      <div className="page sign-in">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
            </div>
          ))}
            <style jsx>{`
              .sign-in {
                padding: 3rem 0;
              }

              .sign-in__form {
                max-width: 24rem;
                margin: 0 auto;
                padding: 0 1rem;
              }

              .sign-in__form label {
                display: inline-block;
                margin-bottom: .4rem;
              }

              .sign-in__form input {
                width: 100%;
                margin-bottom: 1rem;
              }
            `}</style>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders()
    return {
        props: {
            providers
        }
    }
}

export default SignIn
