import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import './index.css';
import routes from './routes/route';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <HashRouter >
          <Switch>
            {
              routes.map((route, index)=>(
                <Route
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
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

