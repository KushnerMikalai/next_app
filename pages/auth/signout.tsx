import React from 'react'
import { GetServerSideProps } from 'next'
import { getCsrfToken } from 'next-auth/client'

interface Props {
    csrfToken: string
}

const SignOut: React.FC<Props> = ({csrfToken}) => {
    return (
        <div className="page sign-in">
            <form
                className={'sign-in__form'}
                method='post'
                action='/api/auth/signout'
                id="signout"
            >
                <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                <button type='submit'>Sign Out</button>
            </form>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const csrfToken: string | null = await getCsrfToken(context)
    return {
        props: {csrfToken}
    }
}

export default SignOut
