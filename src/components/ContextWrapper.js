import React, { Fragment } from 'react'
import AuthProvider from "../context/AuthProvider";
import ClassesProvider from '../context/ClassesProvider';
import RostersProvider from '../context/RostersProvider';

const ContextWrapper = ({ children }) => {
    return (
        <Fragment>
            <AuthProvider>
                <ClassesProvider>
                    <RostersProvider>
                        {children}
                    </RostersProvider>
                </ClassesProvider>
            </AuthProvider>
        </Fragment>
    )
}

export default ContextWrapper
