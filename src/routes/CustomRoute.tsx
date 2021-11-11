import { Redirect, Route } from "react-router-dom";
import React from "react";
import { CustomRouteProps } from "@/@types/props";
import { useSelector } from "react-redux";
import { AppState } from "@/reducers";



const CustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {
    if(rest.protected){
        const auth = useSelector((state:AppState)=>state.auth.user)
        if(!auth){
            return <Redirect to={"/login"}/>
        }
    }
    return (
        <Route {...rest}/>
    )
  
}

export default CustomRoute; 