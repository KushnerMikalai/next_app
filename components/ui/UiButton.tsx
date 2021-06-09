import * as React from 'react'
import styles from '../../styles/components/ui/UiButton.module.css'

export interface UiButton {
    disabled?: boolean
    text?: string
    iconCustom?: string
    onClick?: any
}

const UiButton: React.FunctionComponent<UiButton> = props => {
    const { disabled, text, onClick } = props

    return (
        <button
            className={styles.button}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default UiButton
