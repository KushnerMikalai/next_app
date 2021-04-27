import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return <div>
        <nav>
            <Link href={'/'}>Home</Link>
            <Link href={'/tasks'}>Tasks</Link>
        </nav>
        {children}
        <footer className={styles.footer}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
            </a>
        </footer>
    </div>
}
