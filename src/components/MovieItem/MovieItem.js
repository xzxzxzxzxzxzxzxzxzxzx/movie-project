import React, { Component } from 'react';
import { addToFavoritesAction } from '../../redux/actions';
import store from '../../redux/store';
import './MovieItem.css';

class MovieItem extends Component {
    addToFavorites(imdbID, title, year) {
        store.dispatch(addToFavoritesAction(imdbID, title, year));
    }

    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.addToFavorites(imdbID, Title, Year)}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;