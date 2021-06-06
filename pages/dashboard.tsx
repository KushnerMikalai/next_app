import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import { NextPage } from 'next'
import { UserType } from '../interfaces'
import Error, { ErrorType } from '../components/Error'

interface Props extends ErrorType {
    user: UserType
}

const Dashboard: NextPage<Props> = ({ user, errorCode }) => {
    if (errorCode) {
        return <Error errorCode={errorCode} />
    }
    return <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <div className="index">
            <h1>Dashboard</h1>
            {JSON.stringify(user)}
        </div>
    </>
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

export default Dashboard
