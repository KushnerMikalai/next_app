import * as React from 'react'
import { IIconProps, PrimaryButton } from '@fluentui/react'

export interface IButtonPrimayProps {
    disabled?: boolean
    iconName?: string
    text?: string
    onClick?: any
}

const UiButtonPrimary: React.FunctionComponent<IButtonPrimayProps> = props => {
    const { disabled, iconName, text, onClick } = props
    const Icon: IIconProps = { iconName }

    return (
        <PrimaryButton
            iconProps={Icon}
            disabled={disabled}
            text={text}
            onClick={onClick}
        />
    )
}

export default UiButtonPrimary
