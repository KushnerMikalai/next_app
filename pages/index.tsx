import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import RouteLoader from '../components/RouteLoader'
import { getProviders, signIn, getSession } from 'next-auth/client'
import { useAppDispatch } from '../store/hooks'
import { showPageLoader, hidePageLoader } from '../store/slices/rootSlice'
import AuthProviderList from '../components/AuthProviderList'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { NEXTAUTH_URL } = publicRuntimeConfig

interface Provider {
    name: string
    id: string
}

interface Props {
    providers: Provider[]
    session: any
}

const Index: React.FC<Props> = ({ providers }) => {
    const dispatch = useAppDispatch()

    const handleSignIn = (id: string) => {
        dispatch(showPageLoader())
        setTimeout(() => dispatch(hidePageLoader()), 1500)
        console.log(`${NEXTAUTH_URL}/dashboard`);

        signIn(id, { callbackUrl: `${NEXTAUTH_URL}/dashboard` })
    }

    return (
        <>
            <Head>
                <title>Laveha</title>
                <meta name="description" content="Automate your budget"/>
                <meta name="author" content="niko" />
                <meta name="theme-color" content="#DA291C"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta property="og:image" content="https://next-test-js.vercel.app/index.jpg"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
                <link rel="manifest" href="/favicon/site.webmanifest"/>
            </Head>
            <div className="index">
                <RouteLoader/>
                <div className="header">
                    <div className="header__row">
                        <div className="header__col">
                            <h1 className="t-selection">Budget planner</h1>
                            <h2 className="t-selection">Automate your budget</h2>
                        </div>
                        <div className="header__col header__col_auth">
                            <div className="login">
                                <span className="label">Sign in with:</span>
                                <AuthProviderList
                                    providers={providers}
                                    signIn={handleSignIn}
                                    justifyContent={'center'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .index {
                    position: relative;
                    height: 100%;
                }

                .label {
                    display: inline-block;
                    margin-bottom: 10px;
                    margin-top: 0;
                    font-size: 20px;
                    font-weight: 600;
                    font-family: var(--primaryFontFamily);
                }

                .header {
                    height: 100%;
                }

                .header__row {
                    display: flex;
                    height: 100%;
                }

                .header__col {
                    width: 50%;
                }

                .header__col_auth {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .login {
                    text-align: center;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
                    border: 1px solid var(--gray-6);
                }
            `}</style>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    const providers = await getProviders()

    if (session) {
        context.res.setHeader('location', '/dashboard');
        context.res.statusCode = 302;
        return {
            props: {
                providers: []
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
