import React, { MouseEvent } from 'react'

interface Props {
    width?: string
    minWidth?: string
    iconCustom?: string
    icon?: string
    children?: React.ReactNode
    onClick?: (e: MouseEvent) => void
}

const UiButton: React.FC<Props> = ({ iconCustom, icon, children, width, minWidth, onClick }) => {
    return (
        <button
            className="ui-button"
            onClick={onClick}
        >
            <span className="ui-button-content">
                {iconCustom && <i className="ui-button-icon"></i>}
                {!iconCustom && icon &&
                    // TODO: move to UiIcon component
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ui-button-icon-hero"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                }
                {children}
            </span>

            <style jsx>{`
                .ui-button {
                    display: inline-block;
                    width: ${width || 'initial'};
                    min-width: ${minWidth || 'initial'};
                    font-size: 14px;
                    color: var(--text);
                    padding: .5rem 1.2rem;
                    border: 1px solid var(--gray-6);
                    border-radius: .3rem;
                    transition: all .1s cubic-bezier(.645,.045,.355,1);
                    cursor: pointer;
                    background-color: initial;
                    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
                    white-space: nowrap;
                }

                .ui-button:hover {
                    border: 1px solid var(--primary-6);
                    color: var(--primary-6);
                }

                .ui-button:active {
                    opacity: 1;
                }

                .ui-button-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--primaryFontFamily);
                    font-weight: 600;
                }

                .ui-button-icon-hero {
                    margin-right: 10px;
                    display: inline-block;
                    width: 16px;
                }

                .ui-button-icon {
                    margin-right: 10px;
                    display: inline-block;
                    background-image: ${iconCustom ? `url(${iconCustom})` : 'initial'};
                    width: 16px;
                    height: 16px;
                    background-size: contain;
                }
            `}</style>
        </button>
    )
}

export default UiButton
