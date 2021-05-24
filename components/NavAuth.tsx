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

    const userName = session && session.user ? session.user.email || session.user.name : ''
    const userShortName = userName ? `${userName[0]}${userName[1]}` : ''

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
                                session.user.image ?
                                    <div className="nav-user__avatar">
                                        <img
                                            className="nav-user__avatar-img"
                                            src={session.user.image}
                                            alt={userShortName}
                                        />
                                    </div> :
                                    <div className="nav-user__avatar nav-user__avatar_no-image">
                                        <span>{userShortName}</span>
                                    </div>
                            }
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
                    margin-right: 20px;
                }

                .nav-user__avatar {
                    display: inline-block;
                    border-radius: 50%;
                    overflow: hidden;
                    width: 34px;
                    height: 34px;
                }

                .nav-user__avatar_no-image {
                    padding: 0;
                    border: 1px solid #000;
                    text-transform: uppercase;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .nav-user__avatar-img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    )
}

export default NavAuth