import React from "react";
import { Chat } from "./Chat.jsx";
import { UserList } from "./UserList.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Chat</Link>
          </li>
          <li>
            <Link to="/username">My Profile</Link>
          </li>
          <li>
            <Link to="/users">All Users</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/username">ME</Route>
        <Route path="/" exact>
          <Chat />
        </Route>
        <Route path="/">404</Route>
      </Switch>
    </div>
  </Router>
);
