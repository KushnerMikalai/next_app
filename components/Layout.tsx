import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../store/hooks'
import { selectPageLoader } from '../store/slices/rootSlice'
import getConfig from 'next/config'

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
        <div className="layout">
            {pageLoader && <PageLoader />}
            {session &&
                <header className="header">
                    <Link href="/">
                        <a
                            className="logo"
                            data-category="Site-Wide Custom Events"
                            data-label="Site logo"
                        >
                            {APP_NAME}
                        </a>
                    </Link>
                    <Nav/>
                </header>
            }
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
                    background-color: #fff;
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
                    font-size: 16px;
                    text-transform: uppercase;
                    font-weight: 600;
                }
                .logo img {
                    width: 72px;
                }
            `}</style>
        </div>
    )
}
