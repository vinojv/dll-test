import React from 'react';
import { Route } from 'react-router';
import { Main } from 'core';

Main.injectRoutes({
  type: 'inject', routes: [
    <Route exact path='/module' render={() => <span>test</span>} />,
    <Route exact path='/module2' component={() => <span>module2route</span>} />,
  ],
});

export default 'module2';

