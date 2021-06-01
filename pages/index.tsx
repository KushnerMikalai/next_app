import React from 'react'
import Head from 'next/head'
import RouteLoader from '../components/RouteLoader'

const Index = () => (
    <>
        <Head>
            <title>Laveha</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
            <link rel="manifest" href="/favicon/site.webmanifest"/>
        </Head>
        <div className="index">
            <RouteLoader/>
        </div>
        <style jsx>{`
            .index {
                position: relative;
                height: 100%;
            }
        `}</style>
    </>
)

export default Index
