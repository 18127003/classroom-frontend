import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, RouteComponentProps, Switch } from 'react-router-dom';
import './index.css';
import CustomRoute from './routes/CustomRoute';
import routes from './routes/route';
import AuthProvider from './store/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter basename="/ptudwnc-app">
        <Switch>
          {
            routes.map((route, index)=>(
              <CustomRoute
                condition={route.condition}
                redirect={route.redirect} 
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <route.component
                      name={route.name} 
                      {...props}
                      {...route.props}
                  />
                )}/>
            ))
          }
        </Switch>
      </HashRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

