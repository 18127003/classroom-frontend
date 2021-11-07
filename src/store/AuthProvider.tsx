import useAuthProvider, { IUseAuthProvider } from "@/hooks/useAuthProvider";
import React, { createContext } from "react";

export const AuthContext = createContext<IUseAuthProvider|null>(null);

const AuthProvider: React.FC = ({children}) => {
    const auth = useAuthProvider();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider;
