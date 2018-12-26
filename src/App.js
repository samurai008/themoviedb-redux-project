import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";

import Posts from "./components/Posts";
import store from "./store";
import SearchForm from "./components/SearchForm";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <Route path="/" component={SearchForm} />
        <Route path="/" exact component={Posts} />
        <Route path="/movie/:movieId" component={MovieDetail} />
      </Provider>
    );
  }
}

export default App;
