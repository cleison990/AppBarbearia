//esse componente evolve todo o app pra fornecer o status de autenticação do usuário em qualquer tela 
//documentação firebase no react-native "https://rnfirebase.io/"


import React, {useEffect, useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const {children} = props;
    
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
      }, []);
    
      if (initializing) return null;



return (
    <AuthContext.Provider value={{ user, setUser
    }}>{children}</AuthContext.Provider>
);

};