import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../store/hooks'
import { selectPageLoader } from '../store/slices/rootSlice'

import Nav from './Nav'
import PageLoader from './PageLoader'
import Footer from './Footer'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    const pageLoader = useAppSelector(selectPageLoader)

    return (
        <div className="layout">
            {pageLoader && <PageLoader />}
            <header className="header">
                <Link href="/">
                    <a
                        className="logo"
                        data-category="Site-Wide Custom Events"
                        data-label="Site logo"
                    >
                        <img src="/logo_laveha.svg" alt="Laveha" />
                    </a>
                </Link>
                <Nav/>
            </header>
            <main className="content">
                {children}
            </main>
            <Footer/>

            <style jsx>{`
                .layout {
                    display: grid;
                    grid-template-areas: "header" "content" "footer";
                    grid-template-columns: 1fr;
                    grid-template-rows: auto 1fr auto;
                    height: 100%;
                }

                .header {
                    grid-area: header;
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 52px;
                    padding-left: 20px;
                    padding-right: 20px;
                    background-color: #FFF;
                    border-bottom: 1px solid var(--gray-4);
                }

                .content {
                    grid-area: content;
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .logo {
                    margin-right: 1rem;
                    display: inline-block;
                    font-size: 0;
                }
                .logo img {
                    width: 72px;
                }
            `}</style>
        </div>
    )
}
