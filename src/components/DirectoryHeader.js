import React from 'react';
import NavigateButton from './NavigateButton';

const DirectoryHeader = ({ headerName, children }) => {
    return (
        <div>
            <div className="row justify-content-center m-4">
                <h1 className="display-3">
                    {headerName}
                </h1>
            </div>
            <div className="row m-4">
                <div className="card w-100 py-2 px-4">
                    {children}
                </div>
            </div>
            <div className="row justify-content-center">
                <NavigateButton buttonName="Back To Home" url="/" />
            </div>
        </div>
    )
}

export default DirectoryHeader
