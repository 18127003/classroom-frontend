import { Redirect, Route, RouteProps } from "react-router-dom";
import React from "react";

interface CustomRouteProps extends RouteProps {
    condition?: ()=>boolean,
    redirect?: string
}

const CustomRoute: React.FC<CustomRouteProps> = ({...rest}) => {

    if(rest.condition && rest.condition()) {
        return (
            <Route {...rest}/>
        )
    }
    return <Redirect to={rest.redirect??"/login"}/>
}

export default CustomRoute;