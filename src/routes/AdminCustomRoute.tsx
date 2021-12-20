import { CustomRouteProps } from "@/@types/props"
import { AppState } from "@/reducers"
import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"

const AdminCustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {
    const auth = useSelector((state:AppState)=>state.auth.user)
    const loggedOut = useSelector((state:AppState)=>state.auth.loggedOut)
    if(!auth ||auth.role!=='ADMIN'){
        return <Redirect to={{
            pathname: '/login/admin',
            state: loggedOut?"/admin":`${rest.location.pathname}${rest.location.search}`
        }}/>
    } 
    // else if (auth.role!=='ADMIN'){
    //     return <>Page not found</>
    // }
    return (
        <Route {...rest}/>
    )
  
}

export default AdminCustomRoute; 