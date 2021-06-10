import getConfig from 'next/config'
import styles from '../styles/components/Footer.module.css'

export interface Footer {}

const Footer: React.FunctionComponent<Footer> = () => {
    const { publicRuntimeConfig } = getConfig()
    const { APP_NAME } = publicRuntimeConfig
    const copyright = {__html: `${APP_NAME} &copy; ${new Date().getFullYear()}`}

    return (
        <footer className={styles.footer}>
            <div
                className={styles.copyright}
                dangerouslySetInnerHTML={copyright}
            ></div>
        </footer>
    )
}

export default Footer
