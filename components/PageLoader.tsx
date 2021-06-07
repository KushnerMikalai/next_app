import * as React from 'react'
import { Spinner, SpinnerSize } from '@fluentui/react'

const PageLoader: React.FunctionComponent = () => {
    return (
        <>
            <div className="loader">
                <Spinner size={SpinnerSize.large} />
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
            `}</style>
        </>
    )
}

export default PageLoader
