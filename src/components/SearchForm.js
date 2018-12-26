import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/movieActions";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: "",
      lang: "",
      l_rating: "",
      u_rating: ""
    };
	}
	
	handleOnChange = (e) => {
		if (e.target.name.includes('rating') && e.target.value.length > 1) {
			console.log('Rating values cannot be more than a digit.')
			return;
		}
		this.setState({
			[e.target.name]: e.target.value
		})
  }

  componentWillMount() {
    this.props.fetchMovies();
  }

	handleOnSubmit = (e) => {
		e.preventDefault()
		console.log(this.state)
    this.props.fetchMovies(this.state)
    this.props.history.replace('/')
	}

  render() {
    return (
      <div className="container mb-4">
        <form onSubmit={this.handleOnSubmit}>
          <div className="row mt-2 justify-content-center">
            <div className="col col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Movie name"
								value={this.state.movieName}
								onChange={this.handleOnChange}
								name="movieName"
              />
            </div>
          </div>
          <div className="row mt-2 justify-content-center">
            <div className="col-6 col-md-4">
              <select className="form-control" name="lang" onChange={this.handleOnChange}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>
            <div className="col-6 col-md-4 d-flex align-items-center">
              <div className="mr-2">Rating</div>
              <div className="mr-2">
                <input
                  type="number"
                  className="form-control"
                  name="l_rating"
									value={this.state.l_rating}
									onChange={this.handleOnChange}
                />
              </div>
              <div className="mr-2">
                <strong>-</strong>
              </div>
              <div>
                <input
                  type="number"
                  className="form-control"
                  name="u_rating"
                  value={this.state.u_rating}
									onChange={this.handleOnChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2 justify-content-center">
            <div className="col-12 col-md-8">
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Filter
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {fetchMovies})(SearchForm)
