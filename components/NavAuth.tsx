import React, { MouseEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession, getProviders, signIn, Provider } from 'next-auth/client'

interface Provider {
    name: string
    id: string
}

async function handleSignOut(e: MouseEvent) {
    e.preventDefault()
    await signOut()
}

function NavAuth() {
    const [session] = useSession()
    const router = useRouter()

    const [providers, setProviders] = useState<Provider[]>([]);

    useEffect(() => {
        async function getProvidersList() {
            const providers = await getProviders()
            const providersList = providers ? Object.values(providers) : [];
            setProviders(providersList)
        }

        if (!session) {
            getProvidersList()
        }
    }, [])

    const signInActive = router.pathname === '/auth/signin'

    return (
        <>
            <div className="auth">
                {!session && providers &&
                    providers.map((provider) => (
                        <div key={provider.name}>
                            <button
                                className="link"
                                onClick={() => signIn(provider.id)}
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))
                }
                {session?.user && (
                    <div className="nav-user">
                        <div className="nav-user__content">
                            {
                                session.user.image &&
                                <span
                                    className="nav-user__avatar"
                                    style={{backgroundImage: `url(${session.user.image})`}}
                                ></span>
                            }
                            <span>
                                <small>Signed in as</small>
                                <br/>
                                <strong>{session.user.email || session.user.name}</strong>
                            </span>
                        </div>
                        <a
                            href={`/api/auth/signout`}
                            onClick={handleSignOut}
                            className="link"
                        >
                            Sign out
                        </a>
                    </div>
                )}
            </div>
            <style jsx>{`
                .auth {
                    margin-left: auto;
                }

                .auth__button {
                    margin-left: 1rem;
                    padding: .5rem 1.2rem;
                    border-radius: .3rem;
                    border: 1px solid #eaeaea;
                }

                .link {
                    display: inline-block;
                    font-size: .8rem;
                    text-transform: uppercase;
                    color: ${signInActive ? 'var(--red)' : '#000'};
                    padding: .5rem 1.2rem;
                    border: 1px solid ${signInActive ? 'var(--red)' : '#000'};
                    border-radius: .3rem;
                    transition: all 100ms ease;
                    cursor: ${signInActive ? 'default' : 'pointer'};
                    background-color: initial;
                }

                .link:hover {
                    opacity: ${signInActive ? 1 : .6};
                }

                .link:active {
                    opacity: 1;
                }

                .nav-user {
                    display: flex;
                    align-items: center;
                }

                .nav-user__content {
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;
                }

                .nav-user__avatar {
                    display: inline-block;
                    background-position: center;
                    background-size: contain;
                    border-radius: 50%;
                    overflow: hidden;
                    width: 2.5rem;
                    height: 2.5rem;
                    margin-right: .6rem;
                }
            `}</style>
        </>
    )
}

export default NavAuth