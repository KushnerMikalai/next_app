import '../styles/globals.css'
import '../styles/_colors.css'

import { Provider as ProviderAuth } from 'next-auth/client'
import App, { AppProps, AppContext } from 'next/app'

import { wrapper } from '../store'
import Layout from '../components/Layout'

interface MyAppProps extends AppProps {}

class WrappedApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }: AppContext) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <ProviderAuth
                options={{
                    clientMaxAge: 0,
                    keepAlive: 0,
                }}
                session={pageProps.session}
            >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ProviderAuth>
        )
    }
}

export default wrapper.withRedux(WrappedApp)