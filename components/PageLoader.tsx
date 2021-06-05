function PageLoader() {
    return (
        <>
            <div className="loader">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="#da291c">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </div>
            <style jsx>{`
                .loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    background-color: rgba(255,255,255, 0.7);
                    cursor: wait;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @keyframes spin {
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .icon {
                    width: 44px;
                    height: 44px;
                    animation: spin 2s linear infinite;
                }
            `}</style>
        </>
    )
}

export default PageLoader
