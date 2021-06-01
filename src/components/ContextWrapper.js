import React, { Fragment } from 'react'
import AuthProvider from "../context/AuthProvider";
import ClassesProvider from '../context/ClassesProvider';

const ContextWrapper = ({ children }) => {
    return (
        <Fragment>
            <AuthProvider>
                <ClassesProvider>
                    {children}
                </ClassesProvider>
            </AuthProvider>
        </Fragment>
    )
}

export default ContextWrapper
