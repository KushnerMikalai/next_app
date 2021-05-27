import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getProviders, signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
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

    const documentHandleKeyPress = (e: any) => {
        if (e.key === 'Escape') {
            router.push('/')
        }
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
                        <h1>Welcom to a Laveha</h1>
                    </div>
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
                    <div className="provider-list">
                        {Object.values(providers).map((provider) => (
                            <div
                                className="provider-button"
                                key={provider.name}
                            >
                                <UiButton
                                    icon={`/icons/icon-${provider.name}.svg`}
                                    minWidth="228px"
                                    onClick={() => signIn(provider.id)}
                                >
                                    {`Sign in with ${provider.name}`}
                                </UiButton>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    .provider-button {
                        margin-bottom: 15px;
                    }

                    .sign-in {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 10;
                        background-color: #fff;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }

                    .sign-in__hello {
                        padding: 30px;
                    }

                    .sign-in__section {
                        height: 100%;
                    }

                    .sign-in__section_providers {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-left: 1px solid #000;
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

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders()

    return {
        props: {
            providers,
        }
    }
}

export default SignIn
