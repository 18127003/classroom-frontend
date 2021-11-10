import { Redirect, Route, RouteProps } from "react-router-dom";
import React from "react";

interface CustomRouteProps extends RouteProps {
    condition?: ()=>boolean,
    redirect?: string
}

const CustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {
    if(rest.condition){
        if (rest.condition()){
            return (
                <Route {...rest}/>
            )
        }
        console.log('redirect')
        return <Redirect to={rest.redirect??"/login"}/>
    }
    return <Route {...rest}/>
}

export default CustomRoute;