import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Routing from '../Routing';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="*" component={Routing} />
        </Switch>
      </div>
    );
  }
}
export default App;
