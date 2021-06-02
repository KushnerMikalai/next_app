import React from 'react'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import { NextPage } from 'next'
import Head from 'next/head'
import { UserType } from '../interfaces'
import Error, { ErrorType } from '../components/Error'

interface Props extends ErrorType {
    user: UserType
}

const Profile: NextPage<Props> = ({ user, errorCode }) => {
    if (errorCode) {
        return <Error errorCode={errorCode}/>
    }

    return (
        <>
            <Head>
                <title>Laveha: Profile</title>
            </Head>
            <h1>Profile</h1>
            <ul>
                <li><b>Name:</b>{ user?.name }</li>
                {user?.email &&
                    <li><b>Email:</b>{ user?.email }</li>
                }
            </ul>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (session) {
        return {
            props: {
                user: session.user
            }
        }
    } else {
        return {
            props: {
                errorCode: 401
            }
        }
    }
}

export default Profile
