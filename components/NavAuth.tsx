import styles from '../styles/NavAuth.module.css'
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
            <div className={styles.auth}>
                {session?.user && (
                    <div className={styles.navUser}>
                        <div className={styles.navUserContent}>
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
        </>
    )
}

export default NavAuth
