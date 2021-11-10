import { Redirect, Route } from "react-router-dom";
import React from "react";
import { CustomRouteProps } from "@/@types/props";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/reducers";
import { useCookies } from "react-cookie";
import { loginRefresh } from "@/actions/auth";



const CustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {
    if(rest.protected){
        const auth = useSelector((state:AppState)=>state.auth.user)
        // const [cookies]=useCookies(['user'])
        // const dispatch = useDispatch()
        // if(cookies.user){
        //     dispatch(loginRefresh(cookies.user))
        // }
        if(!auth){
            return <Redirect to={"/login"}/>
        }
    }
    return (
        <Route {...rest}/>
    )
  
}

export default CustomRoute; 