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
            className="button"
            onClick={onClick}
        >
            <span className="button__content">
                {icon && <i className="button__icon"></i>}
                {children}
            </span>
            <style jsx>{`
                .button {
                    display: inline-block;
                    width: ${width || 'initial'};
                    min-width: ${minWidth || 'initial'};
                    font-size: .8rem;
                    text-transform: uppercase;
                    color: #000;
                    padding: .5rem 1.2rem;
                    border: 1px solid #000;
                    border-radius: .3rem;
                    transition: all 100ms ease;
                    cursor: pointer;
                    background-color: initial;
                }

                .button:hover {
                    opacity: .6;
                }

                .button:active {
                    opacity: 1;
                }

                .button__content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .button__icon {
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
