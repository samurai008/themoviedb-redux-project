import { FETCH_MOVIES } from "./types";

export function fetchMovies(filterObj) {
  const checkFilterObj =
    filterObj !== undefined
      ? Object.keys(filterObj).reduce((prev, curr) => {
          if (filterObj[prev] === "") {
            return false;
          } else {
            return true;
          }
        })
      : false;

  return function(dispatch) {
    if (!checkFilterObj) {
      fetch(
        "https://api.themoviedb.org/4/list/1?page=1&api_key=bd0830ad7ef334b313907c035d767bd1"
      )
        .then(res => res.json())
        .then(movies => {
          return dispatch({
            type: FETCH_MOVIES,
            payload: movies.results
          });
        });
    } else {
      const filteredMovieListFn = movieList => {
        return movieList.filter(movie => {
          const languageFilter =
            filterObj.lang !== "" ? filterObj.lang : movie.original_language;
          const lowerVoteAverage =
            filterObj.l_rating !== "" ? filterObj.l_rating : 0;
          const upperVoteAverage =
            filterObj.u_rating !== "" ? filterObj.u_rating : 10;
          
          return (
            movie.title
              .toLowerCase()
              .includes(filterObj.movieName.toLowerCase()) &&
            movie.original_language.includes(filterObj.lang) &&
            (movie.vote_average >= lowerVoteAverage &&
              movie.vote_average <= upperVoteAverage)
          );
        });
      };
      return dispatch({
        type: FETCH_MOVIES,
        filterFn: filteredMovieListFn
      });
    }
  };
}

