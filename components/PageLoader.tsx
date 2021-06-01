function PageLoader() {
    return (
        <>
            <div className="loader">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="#da291c">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    width: 60px;
                    height: 60px;
                    animation: spin 2s linear infinite;
                }
            `}</style>
        </>
    )
}

export default PageLoader
