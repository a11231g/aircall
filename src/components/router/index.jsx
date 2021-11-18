import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from "../../screen/home.jsx";
import Details from "../../screen/details.jsx";

function App () {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route
            path='/activites/:id'
            exact
            component={Details}
          />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
