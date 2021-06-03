import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../styles/loading.css";

const Loading = () => {

    return (
        <div>
            <div className="row m-4 load">
                <div className="container my-auto">
                    <div className="row justify-content-center m-4">
                        <CircularProgress />
                    </div>
                    <div className="row justify-content-center m-4">
                        Loading
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
