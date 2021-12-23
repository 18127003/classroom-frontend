import { Redirect, Route } from "react-router-dom";
import React from "react";
import { CustomRouteProps } from "@/@types/props";
import { useSelector } from "react-redux";
import { AppState } from "@/reducers";
import CrossAccessConfirmDialog from "@/components/Dialog/CrossAccessConfirmDialog";



const CustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {
    if(rest.protected){
        const auth = useSelector((state:AppState)=>state.auth.user)
        const loggedOut = useSelector((state:AppState)=>state.auth.loggedOut)
        if(!auth){
            return <Redirect to={{
                pathname: '/login',
                state: loggedOut?"/":`${rest.location.pathname}${rest.location.search}`
            }}/>
        }
        else if (auth.role==='ADMIN'){
            return <CrossAccessConfirmDialog access="User"/>
        }
    }
    return (
        <Route {...rest}/>
    )
  
}

export default CustomRoute; 