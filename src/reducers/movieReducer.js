import { FETCH_MOVIES } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  filteredItems: [],
  filterResult: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      let filteredMovieList = [];
      if (action.filterFn) {
        filteredMovieList = action.filterFn(state.items);
        if (filteredMovieList.length === 0) {
          console.log('filteredResults')
          return {
            ...state,
            filteredItems: filteredMovieList,
            filterResult: true
          }
        }
        return {
          ...state,
          filteredItems: filteredMovieList,
          filterResult: initialState.filterResult
        };
      }
      return {
        ...state,
        items: action.payload,
        filterResult: initialState.filterResult
      };

    default:
      return state;
  }
}
