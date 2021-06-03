import React, { MouseEvent } from 'react'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import UiButton from '../components/UiButton'
import { useRouter } from 'next/router'

function NavAuth() {
    const [session] = useSession()
    const router = useRouter()

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
                            <Link href="/profile">
                                <a className="nav-user__avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-user__avatar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </a>
                            </Link>
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
                    border-radius: 50%;
                    overflow: hidden;
                    width: 36px;
                    height: 36px;
                    border: 1px solid var(--gray-6);
                    text-transform: uppercase;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .nav-user__avatar:hover {
                    border: 1px solid var(--red);
                }

                .nav-user__avatar-icon {
                    width: 16px;
                }
            `}</style>
        </>
    )
}

export default NavAuth
