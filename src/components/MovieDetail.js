import React, { Component } from "react";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetail: {}
    };
  }

  componentWillMount() {
    const movieId = this.props.match.params.movieId;
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "?page=1&api_key=bd0830ad7ef334b313907c035d767bd1"
    )
      .then(res => res.json())
      .then(data => this.setState({ movieDetail: data }));
  }

  render() {
    const movieDetailCopy = this.state.movieDetail;
    console.log(movieDetailCopy)
    const movie =
      Object.keys(movieDetailCopy).length === 0 ? (
        "Loading data..."
      ) : (
        <div>
          <div className="row mb-2">
            <div className="col">
              <h3>
                {movieDetailCopy.original_title}
                <br />
                <span className="font-weight-light h6 m-0">{movieDetailCopy.tagline}</span>
              </h3>
              <p>{movieDetailCopy.overview}</p>
            </div>
          </div>
          <div className="row mt-2 mb-2">
            <div className="col-6 mb-2 mb-sm-0 col-sm-3">
              <h6 className="m-0">Language</h6>
              {movieDetailCopy.original_language}
            </div>
            <div className="col-6 mb-2 mb-sm-0 col-sm-3">
              <h6 className="m-0">Runtime</h6>
              {movieDetailCopy.runtime}
            </div>
            <div className="col-6 mb-2 mb-sm-0 col-sm-3">
              <h6 className="m-0">Vote avg.</h6>
              {movieDetailCopy.vote_average} ({movieDetailCopy.vote_count})
            </div>
            <div className="col-6 mb-2 mb-sm-0 col-sm-3">
              <h6 className="m-0">Release Date</h6>
              {movieDetailCopy.release_date}
            </div>
          </div>
        </div>
      );

    return <div className="container">{movie}</div>;
  }
}
