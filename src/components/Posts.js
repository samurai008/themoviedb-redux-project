import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/movieActions";
import movieReducer from "../reducers/movieReducer";
import {Link} from 'react-router-dom'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      movies: [],
      filteredMovies: [],
      filterResult: null
    };
  }

  render() {
    let movieListToRender = this.props.movies;

    if (this.props.filteredMovies.length > 0) {
      movieListToRender = this.props.filteredMovies;
    }

    let displayErrorMsg = "";
    if (this.props.filterResult) {
      displayErrorMsg = (
        <div className="alert alert-warning" role="alert">
          No results found!
        </div>
      );
    }

    const movieList = movieListToRender.map(movie => (
      <div key={movie.id}>
        <h6>
          <Link to={"/movie/" + movie.id}>{movie.title}</Link>
        </h6>
        <p>{movie.overview.slice(0, 100)}</p>
      </div>
    ));

    return (
      <div className="container">
        {displayErrorMsg}
        {movieList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.items,
    filteredMovies: state.movies.filteredItems,
    filterResult: state.movies.filterResult
  };
};

export default connect(
  mapStateToProps,
  { fetchMovies }
)(Posts);
