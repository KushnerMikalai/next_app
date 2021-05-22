import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface LinkActiveType {
    href: string,
    children: React.ReactNode
}

const UiLink = ({href, children}: LinkActiveType) => {
    const router = useRouter()

    // @ts-ignore
    let className = children.props.className || ''
    if (router.pathname === href) {
        className = `${className} selected`
    }

    return <Link href={href}>
        {/*@ts-ignore*/}
        {React.cloneElement(children, {className})}
    </Link>
}

export default UiLink
