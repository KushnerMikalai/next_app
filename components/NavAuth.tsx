import React, { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

async function handleSignOut(e: MouseEvent) {
    e.preventDefault()
    await signOut()
}

function NavAuth() {
    const [session] = useSession()
    const router = useRouter()

    const signInActive = router.pathname === '/auth/signin'

    return <>
        <div className="auth">
            {!session &&
            <Link href="/auth/signin">
                <a className="link">Sign in</a>
            </Link>
            }
            {session?.user && (
                <>
                    <span style={{backgroundImage: `url(${session.user.image})`}}></span>
                    <span>
                        <small>Signed in as</small>
                        <br/>
                        <strong>{session.user.email || session.user.name}</strong>
                    </span>
                    <a
                        href={`/api/auth/signout`}
                        onClick={handleSignOut}
                        className="auth__button"
                    >
                        Sign out
                    </a>
                </>
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
          }

          .link:hover {
            opacity: ${signInActive ? 1 : .6};
          }

          .link:active {
            opacity: 1;
          }
        `}</style>
    </>
}

export default NavAuth