import React from 'react'
import Head from 'next/head'
import RouteLoader from '../components/RouteLoader'

const Index = () => (
    <>
        <Head>
            <title>Laveha</title>
            <meta name="description" content="Automate your budget"/>
            <meta name="author" content="niko" />
            <meta name="theme-color" content="#DA291C"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta property="og:image" content="https://next-test-js.vercel.app/index.jpg"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
            <link rel="manifest" href="/favicon/site.webmanifest"/>
        </Head>
        <div className="index">
            <RouteLoader/>
            <h1 className="t-selection">Budget planner</h1>
            <h2 className="t-selection">Automate your budget</h2>
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
