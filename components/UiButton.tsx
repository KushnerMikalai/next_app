import React from 'react'

interface Props {
    width?: string
    minWidth?: string
    icon?: string
    children?: React.ReactNode
    onClick: () => void
}

const UiButton: React.FC<Props> = ({ icon, children, width, minWidth, onClick }) => {
    return (
        <button
            className="ui-button"
            onClick={onClick}
        >
            <span className="ui-button-content">
                {icon && <i className="ui-button-icon"></i>}
                {children}
            </span>

            <style jsx>{`
                .ui-button {
                    display: inline-block;
                    width: ${width || 'initial'};
                    min-width: ${minWidth || 'initial'};
                    font-size: .8rem;
                    text-transform: uppercase;
                    color: #000;
                    padding: .5rem 1.2rem;
                    border: 1px solid var(--gray-6);
                    border-radius: .3rem;
                    transition: all 100ms ease;
                    cursor: pointer;
                    background-color: initial;
                }

                .ui-button:hover {
                    border: 1px solid var(--primary-6);
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

                .ui-button-icon {
                    margin-right: 10px;
                    display: inline-block;
                    background-image: ${icon ? `url(${icon})` : 'initial'};
                    width: 16px;
                    height: 16px;
                    background-size: contain;
                }
            `}</style>
        </button>
    )
}

export default UiButton
