export const fetchMoviesAction = (movies) => ({
    type: 'FETCH_MOVIES',
    payload: {
        movies: movies
    }
});

export const addToFavoritesAction = (imdbID, title, year) => ({
    type: 'ADD_TO_FAVORITES',
    payload: {
        imdbID: imdbID,
        title: title,
        year: year,
    }
});

export const removeFromFavroitesAction = (imdbID) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: {
        imdbID: imdbID
    }
});