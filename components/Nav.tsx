import Link from 'next/link'
import React from "react"
import { useRouter } from 'next/router'

interface LinkActiveType {
    href: string,
    children: React.ReactNode
}

const LinkActive = ({ href, children }: LinkActiveType) => {
    const router = useRouter()

    // @ts-ignore
    let className = children.props.className || ''
    if (router.pathname === href) {
        className = `${className} link_selected`
    }

    // @ts-ignore
    return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

export default function Nav() {
    return <>
        <nav>
            <LinkActive href={'/'}>
                <a className="link">Home</a>
            </LinkActive>
            <LinkActive href={'/tasks'}>
                <a className="link">Tasks</a>
            </LinkActive>
            <LinkActive href={'/tasks/new'}>
                <a className="link">New Task</a>
            </LinkActive>
        </nav>
        <style jsx>{`
          nav {
            font-size: .9rem;
          }

          .link {
            display: inline-block;
          }
          .link_selected {
            color: #6979F8;
          }
          .link:not(:last-child) {
            margin-right: 1rem;
          }
        `}</style>
    </>
}
