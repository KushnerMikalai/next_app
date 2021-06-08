import React, { MouseEvent } from 'react'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

import UiButtonPrimary from './ui/UiButtonPrimary'
import UiButtonIcon from './ui/UiButtonIcon'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { NEXTAUTH_URL } = publicRuntimeConfig

function NavAuth() {
    const [session] = useSession()

    async function handleSignOut(e: MouseEvent) {
        e.preventDefault()
        await signOut({ callbackUrl: `${NEXTAUTH_URL}/` })
    }

    return (
        <>
            <div className="auth">
                {session?.user && (
                    <div className="nav-user">
                        <div className="nav-user__content">
                            <Link href="/profile">
                                <span>
                                    <UiButtonIcon
                                        iconName={'FollowUser'}
                                    />
                                </span>
                            </Link>
                        </div>

                        <UiButtonPrimary
                            text={'Sign out'}
                            iconName={'SignOut'}
                            onClick={handleSignOut}
                        />
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
