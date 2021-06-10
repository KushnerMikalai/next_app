import React from 'react'
import UiButton from '../components/ui/UiButton'
import styles from '../styles/AuthProviderList.module.css'

interface Provider {
    name: string
    id: string
}

interface Props {
    providers: Provider[]
    signIn: (id: string) => void
}

const AuthProviderList: React.FC<Props> = ({providers, signIn}) => {
    return (
        <div className={styles.providerList}>
            {Object.values(providers).map((provider) => (
                <div
                    className={styles.providerButton}
                    key={provider.name}
                >
                    <UiButton
                        iconCustom={`/icons/icon-${provider.name.toLowerCase()}.svg`}
                        text={provider.name}
                        onClick={() => signIn(provider.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default AuthProviderList
