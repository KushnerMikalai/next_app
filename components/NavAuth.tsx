import React, { MouseEvent } from 'react'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import UiButton from '../components/UiButton'
import { useRouter } from 'next/router'

function NavAuth() {
    const [session] = useSession()
    const router = useRouter()

    const userName = session && session.user ? session.user.email || session.user.name : ''
    const userShortName = userName ? `${userName[0]}${userName[1]}` : ''

    async function handleSignOut(e: MouseEvent) {
        e.preventDefault()
        router.push('/')
        await signOut()
    }

    return (
        <>
            <div className="auth">
                {!session &&
                    <Link href="/auth/signin">
                        <a>
                            <UiButton
                                icon={'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'}
                            >
                                Sign in
                            </UiButton>
                        </a>
                    </Link>
                }
                {session?.user && (
                    <div className="nav-user">
                        <div className="nav-user__content">
                            {session.user.image ?
                                <Link href="/profile">
                                    <a className="nav-user__avatar">
                                        <img
                                            className="nav-user__avatar-img"
                                            src={session.user.image}
                                            alt={userShortName}
                                        />
                                    </a>
                                </Link>
                                :
                                <div className="nav-user__avatar nav-user__avatar_no-image">
                                    <span>{userShortName}</span>
                                </div>
                            }
                        </div>
                        <UiButton
                            onClick={(e) => handleSignOut(e)}
                            icon={'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'}
                        >
                            Sign in
                        </UiButton>
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

                .button-icon {
                    width: 18px;
                    margin-right: 5px;
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
