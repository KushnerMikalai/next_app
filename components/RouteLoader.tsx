import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PageLoader from './PageLoader'

function createUrlWithoutLocation(url: string, locale: string) {
    return url.replace(`/${locale}/`, '/')
}

function findCurrentUrl(url: string, locale: string = '', defaultLocale: string = '') {
    return locale !== defaultLocale ? createUrlWithoutLocation(url, locale) : url
}

function RouteLoader() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleStart = (url: string) => {
            (findCurrentUrl(url, router.locale, router.defaultLocale) !== router.asPath) && setLoading(true)
        }
        const handleComplete = (url: string) => {
            (findCurrentUrl(url, router.locale, router.defaultLocale) === router.asPath) && setLoading(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [])

    return (
        <>{loading && <PageLoader/>}</>
    )
}

export default RouteLoader
