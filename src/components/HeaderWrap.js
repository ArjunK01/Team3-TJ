import React from 'react'
import NavigateButton from './NavigateButton';
import '../styles/headerWrap.css';

const HeaderWrap = ({ headerName, children }) => {
    return (
        <div>
            <div className="row m-4">
                <h1 className="h2 header m-2">
                    {headerName}
                </h1>
            </div>
            <div className="row m-4">
                <div className="card w-100 outer-wrap-card">
                    <div className="card py-2 px-4 m-2 inner-wrap-card">
                        {children}
                    </div>
                </div>
            </div>
            <div className="row justify-content-center m-4">
                <NavigateButton buttonName="Back To Dashboard" url="/" />
            </div>
        </div>
    )
}

export default HeaderWrap
