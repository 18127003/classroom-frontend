import { CustomRouteProps } from "@/@types/props"
import CrossAccessConfirmDialog from "@/components/Dialog/CrossAccessConfirmDialog"
import { AppState } from "@/reducers"
import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"

const AdminCustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {
    const auth = useSelector((state:AppState)=>state.auth.user)
    if(!auth){
        return <Redirect to={{
            pathname: '/login/admin'
        }}/>
    } 
    else if (auth.role!=='ADMIN'){
        return <CrossAccessConfirmDialog access="Admin"/>
    }
    return (
        <Route {...rest}/>
    )
  
}

export default AdminCustomRoute; 