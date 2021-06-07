import * as React from 'react'
import { IIconProps, IconButton } from '@fluentui/react'

export interface IButtonPrimayProps {
    disabled?: boolean
    iconName?: string
    onClick?: any
}

const UiButtonIcon: React.FunctionComponent<IButtonPrimayProps> = props => {
    const { disabled, iconName, onClick } = props
    const Icon: IIconProps = { iconName }

    return (
        <IconButton
            iconProps={Icon}
            disabled={disabled}
            onClick={onClick}
        />
    )
}

export default UiButtonIcon
