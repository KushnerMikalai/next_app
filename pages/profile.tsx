import React from 'react'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import { NextPage } from 'next'
import Head from 'next/head'

interface Props {
    user: any
}

const Profile: NextPage<Props> = ({ user }) => {
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
        context.res.setHeader('location', '/auth/signin');
        context.res.statusCode = 302;
        context.res.end();
        return {props: {}}
    }
}

export default Profile
