import React from 'react'
import Head from 'next/head'
import Layout from '../components/layouts'
import Counter from '../features/counter/Counter'

const Index = () => (
    <Layout>
        <>
            <Head>
                <title>next_app</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Counter/>
            </main>
        </>
    </Layout>
)

export default Index
