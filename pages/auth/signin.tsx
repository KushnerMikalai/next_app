import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getProviders, signIn, useSession, getSession } from 'next-auth/client'
import { useAppDispatch } from '../../store/hooks'
import { showPageLoader, hidePageLoader } from '../../store/slices/rootSlice'

import UiButton from '../../components/UiButton'

interface Provider {
    name: string
    id: string
}

interface Props {
    providers: Provider[]
}

const SignIn: React.FC<Props> = ({ providers }) => {
    const router = useRouter()
    const [session] = useSession();
    const dispatch = useAppDispatch()

    const documentHandleKeyPress = (e: any) => {
        if (e.key === 'Escape') {
            router.push('/')
        }
    }

    const handleSignIn = (id: string) => {
        dispatch(showPageLoader())
        setTimeout(() => dispatch(hidePageLoader()), 1500)
        signIn(id)
    }

    const handleClosePage = () => {
        document.removeEventListener('keydown', documentHandleKeyPress)
        router.push('/')
    }

    useEffect(() => {
        if (session) {
            router.push('/')
        } else {
            document.addEventListener('keydown', documentHandleKeyPress)
        }
        return () => {
            document.removeEventListener('keydown', documentHandleKeyPress)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>Laveha: Login</title>
            </Head>
            <div className="page sign-in">
                <div className="sign-in__section">
                    <div
                        className="sign-in__hello"
                    >
                        <h1 className="title t-selection">Budget planner</h1>
                    </div>
                    <Image
                        src="/index.jpg"
                        alt="Budget planner"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </div>
                <div className="sign-in__section sign-in__section_providers">
                    <div
                        className="close-esc"
                        onClick={handleClosePage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="la-label">Sign in with:</h2>
                    <div className="provider-list">
                        {Object.values(providers).map((provider) => (
                            <div
                                className="provider-button"
                                key={provider.name}
                            >
                                <UiButton
                                    iconCustom={`/icons/icon-${provider.name.toLowerCase()}.svg`}
                                    minWidth="120px"
                                    onClick={() => handleSignIn(provider.id)}
                                >
                                    {provider.name}
                                </UiButton>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    .provider-list {
                        display: flex;
                    }

                    .provider-button:not(:last-child) {
                        margin-right: 10px;
                    }

                    .la-label {
                        display: inline-block;
                        margin-bottom: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        font-family: var(--primaryFontFamily);
                    }

                    .provider-button {
                        margin-bottom: 15px;
                    }

                    .sign-in {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 9;
                        background-color: #fff;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }

                    .sign-in__hello {
                        position: relative;
                        padding: 30px;
                        max-width: 400px;
                        z-index: 2;
                    }

                    .title {
                        display: inline-block;
                        background-color: #fff;
                    }

                    .sign-in__section {
                        position: relative;
                        height: 100%;
                    }

                    .sign-in__section_providers {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-left: 1px solid var(--gray-4);
                    }

                    .sign-in__image {
                        width: 100%;
                        height: 100%;
                        background-repeat: repeat;
                    }
                    .close-esc {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        text-align: center;
                        width: 36px;
                        cursor: pointer;
                    }

                    .close-esc svg {
                        display: inline-block;
                        width: 100%;
                        transition: all 150ms ease;
                    }

                    .close-esc:hover svg {
                        stroke: var(--red);
                    }
                `}</style>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    const providers = await getProviders()

    if (session) {
        context.res.setHeader('location', '/');
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

export default SignIn
