import Link from 'next/link'
import React from 'react'

import { useAppSelector } from '../store/hooks'

import Nav from './Nav'
import PageLoader from './PageLoader'

import { selectPageLoader } from '../store/slices/rootSlice'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    const pageLoader = useAppSelector(selectPageLoader)

    return <>
        {pageLoader && <PageLoader />}
        <div className="top-nav">
            <Link href="/">
                <a className="logo"></a>
            </Link>
            <Nav/>
        </div>
        <div className="content">
            {children}
        </div>
        <footer>
            <a
                href="https://github.com/KushnerMikalai"
                target="_blank"
                rel="noopener noreferrer"
            >
                Code by Niko
            </a>
        </footer>

        <style jsx>{`
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .content {
            padding: 1rem;
            background-color: #FAFAFA;
          }

          .top-nav {
            position: relative;
            display: flex;
            align-items: center;
            padding: 1rem;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.07);
            background-color: #FFF;
          }

          .logo {
            position: relative;
            margin-right: 1rem;
            display: inline-block;
            font-size: 0;
            cursor: pointer;
            width: 2rem;
            height: 2rem;
          }

          .logo::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transition: all 60ms ease;
            transform: translate(-50%, -50%);
            border: 1px solid #000;
            border-radius: 50%;
          }

          .logo:active::before {
            width: 76%;
            height: 76%;
          }
        `}</style>
    </>
}
