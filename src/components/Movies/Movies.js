import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../redux/store';

class Movies extends Component {
    state = { 
        movies: []
    }

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            this.setState({
                movies: state.movieList
            });
        });
    }
    
    render() { 
        return ( 
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default Movies;