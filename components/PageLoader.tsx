function PageLoader() {
    return (
        <div className="page-loader">
            <div className="page-loader__content">
                loading...
            </div>

            <style jsx>{`
                .page-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    background-color: #fff;
                }

                .page-loader__content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            `}</style>
        </div>
    )
}

export default PageLoader