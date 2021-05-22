import { useState, useEffect } from 'react'

const isMobile = () => {
    const ua = navigator.userAgent
    return /Android|Mobi/i.test(ua)
}

const Cursor = () => {
    if (typeof navigator !== 'undefined' && isMobile()) return null

    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [clicked, setClicked] = useState(false)
    const [linkHovered, setLinkHovered] = useState(false)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        addEventListeners()
        handleLinkHoverEvents()
        return () => removeEventListeners()
    }, [])

    const addEventListeners = () => {
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseenter', onMouseEnter)
        document.addEventListener('mouseleave', onMouseLeave)
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)
    }

    const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseenter", onMouseEnter)
        document.removeEventListener("mouseleave", onMouseLeave)
        document.removeEventListener("mousedown", onMouseDown)
        document.removeEventListener("mouseup", onMouseUp)
    }

    // @ts-ignore
    const onMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseDown = () => {
        setClicked(true)
    }

    const onMouseUp = () => {
        setClicked(false)
    }

    const onMouseLeave = () => {
        setHidden(true)
    }

    const onMouseEnter = () => {
        setHidden(false)
    }

    const handleLinkHoverEvents = () => {
        document.querySelectorAll('a').forEach((el) => {
            el.addEventListener('mouseover', () => setLinkHovered(true))
            el.addEventListener('mouseout', () => setLinkHovered(false))
        })
    }

    return (
        <>
            <div
                className={`
                    cursor
                    ${clicked ? "cursor--clicked" : ''},
                    ${hidden ? "cursor--hidden" : ''},
                    ${linkHovered ? "cursor--link-hovered" : ''},
                `}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <style jsx>{`
                .cursor {
                    width: 25px;
                    height: 25px;
                    border: 2px solid #000;
                    border-radius: 100%;
                    position: fixed;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    transition: all 150ms ease;
                    transition-property: background-color, opacity, transform, mix-blend-mode;
                    z-index: 9999;
                }

                .cursor--hidden {
                    opacity: 0;
                }

                .cursor--link-hovered {
                    transform: translate(-50%, -50%) scale(1.25);
                    background-color: #fefefe;
                }

                .cursor--clicked {
                    transform: translate(-50%, -50%) scale(0.9);
                    background-color: #fefefe;
                }
            `}</style>
        </>
    
    )
}

export default Cursor