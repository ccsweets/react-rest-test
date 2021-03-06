import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import List from './routes/List';
import Read from "./routes/Read";
//import Read from './routes/Read';
//import Write from './routes/Write';

class App extends Component {
  render() {
    return (
      <div> {/*
        <div className="lnk">
          <ul>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="/read">Read</Link>
            </li>
          </ul>
        </div>
        */}
        <div className="route">
            <Route exact path="/" component={List} />
            <Route path="/read/:id?" component={Read} />
        </div>
      </div>
    );
  }
}

export default App;