const initialState = {
  movieList: [],
  favoriteList: [],
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return { ...state, movieList: action.payload.movies };

    case 'ADD_TO_FAVORITES':
      const findItem = state.favoriteList.some((movie) => movie.imdbID === action.payload.imdbID);
      return findItem ? state : { ...state, favoriteList: [...state.favoriteList, action.payload] };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favoriteList: state.favoriteList.filter((movie) => movie.imdbID !== action.payload.imdbID),
      };

    default:
      return state;
  }
}

export default movieReducer;
