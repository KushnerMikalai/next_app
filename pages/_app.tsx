import 'modern-normalize'
import '../styles/_colors.css'
import '../styles/globals.css'
import { Provider as ProviderAuth } from 'next-auth/client'
import App, { AppProps, AppContext } from 'next/app'
import Router from 'next/router'
import { getSession } from 'next-auth/client'
import { wrapper } from '../store'
import Layout from '../components/Layout'
import ProgressBar from '@badrap/bar-of-progress'

interface MyAppProps extends AppProps {}

const progress = new ProgressBar({
    size: 3,
    color: '#0078d4',
    className: 'bar-of-progress',
    delay: 100,
})
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

class WrappedApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }: AppContext) {
        const session = await getSession(ctx)
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {session}

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
                <Layout session={pageProps.session}>
                    <Component {...pageProps} />
                </Layout>
            </ProviderAuth>
        )
    }
}

export default wrapper.withRedux(WrappedApp)
