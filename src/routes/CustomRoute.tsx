import { Redirect, Route } from "react-router-dom";
import React from "react";
import { CustomRouteProps } from "@/@types/props";
import { useSelector } from "react-redux";
import { AppState } from "@/reducers";



const CustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {
    if(rest.protected){
        const auth = useSelector((state:AppState)=>state.auth.user)
        const loggedOut = useSelector((state:AppState)=>state.auth.loggedOut)
        if(!auth || auth.role==='ADMIN'){
            return <Redirect to={{
                pathname: '/login',
                state: loggedOut?"/":`${rest.location.pathname}${rest.location.search}`
            }}/>
        }
    }
    return (
        <Route {...rest}/>
    )
  
}

export default CustomRoute; 