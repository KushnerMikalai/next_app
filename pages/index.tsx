import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layouts'

const Index = () => (
    <Layout>
        <div className={styles.container}>
            <Head>
                <title>next_app</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
            </main>
        </div>
    </Layout>
)

export default Index
