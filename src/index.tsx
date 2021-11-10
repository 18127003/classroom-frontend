import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, RouteComponentProps, Switch } from 'react-router-dom';
import './index.css';
import routes from './routes';
import CustomRoute from './routes/CustomRoute';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <HashRouter >
          <Switch>
            {
              routes.map((route, index)=>(
                <CustomRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  protected={route.protected}
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
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

