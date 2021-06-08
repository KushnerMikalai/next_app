import * as React from 'react'
import { Loader } from 'react-feather'
import styles from '../styles/PageLoader.module.css'

const PageLoader: React.FunctionComponent = () => {
    return (
        <>
            <div className={styles.loader}>
                <Loader size={48} className={styles.loaderIcon} />
            </div>
        </>
    )
}

export default PageLoader
