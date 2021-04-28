import Link from 'next/link'
import React from 'react'
import Nav from '../Nav'

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return <>
        <div className="top-nav">
            <span className="logo">
                <Link href="/">
                    <img src="/logo.svg" alt="app"/>
                </Link>
            </span>
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
            margin-right: 1rem;
            display: inline-block;
            font-size: 0;
            cursor: pointer;
          }

          .logo img {
            width: 2.4rem;
            height: 2.4rem;
          }
        `}</style>
    </>
}
