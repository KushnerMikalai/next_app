import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../store/hooks'
import { selectPageLoader } from '../store/slices/rootSlice'
import getConfig from 'next/config'
import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import PageLoader from './PageLoader'
import Footer from './Footer'

interface LayoutProps {
    children: React.ReactNode
    session: any
}

export default function Layout({children, session}: LayoutProps) {
    const pageLoader = useAppSelector(selectPageLoader)
    const { publicRuntimeConfig } = getConfig()
    const { APP_NAME } = publicRuntimeConfig

    return (
        <div className={styles.layout}>
            {pageLoader && <PageLoader />}
            {session &&
                <header className={styles.header}>
                    <Link href="/dashboard">
                        <a
                            className={styles.logo}
                            data-category="Site-Wide Custom Events"
                            data-label="Site logo"
                        >
                            {APP_NAME}
                        </a>
                    </Link>
                    <Nav/>
                </header>
            }
            <main className={styles.content}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}
