import React from 'react';
import { Route } from 'react-router';
import { AppContext } from 'core';

window.injectRoutes({
  type: 'inject', routes: [
    <Route exact path='/module' render={() => <span>test</span>} />,
    <Route exact path='/module2' component={() => <span>module2route</span>} />,
  ],
});
// AppContext.Consumer(context=>{
//   console.log(context)
// })

export default 'module2';

