import * as React from 'react'

export interface UiButtonPrimayProps {
    disabled?: boolean
    text?: string
    onClick?: any
}

const UiButtonPrimary: React.FunctionComponent<UiButtonPrimayProps> = props => {
    const { disabled, text, onClick } = props

    return (
        <button
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default UiButtonPrimary
