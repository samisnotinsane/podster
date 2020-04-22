import React, { useEffect, useState } from 'react';
import firebase from './index';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;