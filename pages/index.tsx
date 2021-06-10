import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getProviders, signIn, getSession } from 'next-auth/client'
import { useAppDispatch } from '../store/hooks'
import { showPageLoader, hidePageLoader } from '../store/slices/rootSlice'
import AuthProviderList from '../components/AuthProviderList'
import getConfig from 'next/config'

import styles from '../styles/components/IndexHeader.module.css'
import textStyles from '../styles/Text.module.css'

interface Provider {
    name: string
    id: string
}

interface Props {
    providers: Provider[]
    session: any
}

const Index: React.FC<Props> = ({providers}) => {
    const dispatch = useAppDispatch()
    const {publicRuntimeConfig} = getConfig()
    const {NEXTAUTH_URL, APP_NAME} = publicRuntimeConfig

    const handleSignIn = (id: string) => {
        dispatch(showPageLoader())
        setTimeout(() => dispatch(hidePageLoader()), 1500)
        signIn(id, {callbackUrl: `${NEXTAUTH_URL}/dashboard`})
    }

    return (
        <>
            <Head>
                <title>{APP_NAME} - Budget planner</title>
                <meta name="description" content="Automate your budget"/>
                <meta name="author" content="niko"/>
                <meta name="theme-color" content="#DA291C"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta property="og:image" content="https://next-test-js.vercel.app/index.jpg"/>

                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
                <link rel="manifest" href="/favicon/site.webmanifest"></link>
                <meta name="msapplication-TileColor" content="#ffffff"/>
                <meta name="theme-color" content="#ffffff"></meta>
            </Head>
            <div className={styles.index}>
                <div className={styles.header}>
                    <div className={styles.content}>
                        <div className={styles.login}>
                            <h1 className={`${textStyles.selected} ${styles.title}`}>Budget planner</h1>
                            <h2 className={textStyles.selected}>Our free Budget Planner puts you in control of your
                                household spending and analyses your results to help you take control of your money</h2>
                            <i className={styles.line}></i>
                            <span className={styles.label}>Sign in with:</span>
                            <AuthProviderList
                                providers={providers}
                                signIn={handleSignIn}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    const providers = await getProviders()

    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: '/dashboard'
            }
        }
    } else {
        return {
            props: {
                providers,
            }
        }
    }
}

export default Index
