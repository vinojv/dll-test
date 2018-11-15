import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter, NavLink } from 'react-router-dom';

let routes = [];


export const AppContext = React.createContext();

class Main extends React.Component {
  state = {
    routes: [],
  };

  injectRoutes = (event) => {
    console.log(event);
    this.setState({ routes: routes.concat(event.routes) });
  };

  constructor(props) {
    super(props);
    window.injectRoutes = this.injectRoutes;
  }

  render() {
    return (
      <AppContext.Provider value={{
        injectRoutes: this.injectRoutes,
      }}>
        <BrowserRouter>
          <div>
            <span>Core</span>
            <div>
              <NavLink to={'/'}>/</NavLink>
            </div>
            <div>
              <NavLink to={'/module'}>/module</NavLink>
            </div>
            <div>
              <NavLink to={'/module2'}>/module2</NavLink>
            </div>
            <Switch>

              <Route exact path="/" component={() => <span>Home</span>} />
              {this.state.routes}
            </Switch>
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default 'core';