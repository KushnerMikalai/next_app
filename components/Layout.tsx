import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../store/hooks'
import { selectPageLoader } from '../store/slices/rootSlice'
import getConfig from 'next/config'
// import { createTheme, ThemeProvider } from '@fluentui/react';

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

    // const appTheme = createTheme({
    //     palette: {
    //       themePrimary: '#da291c',
    //       themeLighterAlt: '#fdf5f5',
    //       themeLighter: '#f9d9d6',
    //       themeLight: '#f4b8b4',
    //       themeTertiary: '#e8776f',
    //       themeSecondary: '#dd3f34',
    //       themeDarkAlt: '#c32519',
    //       themeDark: '#a51f15',
    //       themeDarker: '#791710',
    //       neutralLighterAlt: '#faf9f8',
    //       neutralLighter: '#f3f2f1',
    //       neutralLight: '#edebe9',
    //       neutralQuaternaryAlt: '#e1dfdd',
    //       neutralQuaternary: '#d0d0d0',
    //       neutralTertiaryAlt: '#c8c6c4',
    //       neutralTertiary: '#a19f9d',
    //       neutralSecondary: '#605e5c',
    //       neutralPrimaryAlt: '#3b3a39',
    //       neutralPrimary: '#323130',
    //       neutralDark: '#201f1e',
    //       black: '#000000',
    //       white: '#ffffff',
    // }})

    return (
        // <ThemeProvider applyTo='body' theme={appTheme}>
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
        // </ThemeProvider>
    )
}
