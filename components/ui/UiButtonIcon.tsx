import * as React from 'react'

export interface UiButtonIconProps {
    disabled?: boolean
    iconName?: string
    onClick?: any
    children: React.ReactNode
}

const UiButtonIcon: React.FunctionComponent<UiButtonIconProps> = props => {
    const { disabled, onClick, children } = props

    return (
        <button
            disabled={disabled}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    )
}

export default UiButtonIcon
