import React, { Component } from 'react';
import './Favorites.css';
import store from '../../redux/store';
import { removeFromFavroitesAction } from '../../redux/actions';
import { Link } from 'react-router-dom';

class Favorites extends Component {
  state = {
    title: 'Новый список',
    movies: [],
    listLink: '',
    inputDisabled: false,
  };

  titleChangeHandler = (e) => {
    this.setState({ title: e.target.value });
  };

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      this.setState({
        movies: state.favoriteList,
      });
    });
  }

  removeHandler = (imdbID) => {
    store.dispatch(removeFromFavroitesAction(imdbID));
  };

  saveHandler = () => {
    this.setState({
      inputDisabled: true,
    });

    setTimeout(() => {
      this.setState({
        inputDisabled: false,
      });
    }, 1000);

    const { title, movies } = { ...this.state };
    if (title.trim().length === 0 || movies.length === 0) return;
    fetch('https://acb-api.algoritmika.org/api/movies/list', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        movies: this.state.movies.map((movie) => {
          return movie.imdbID;
        }),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          listLink: `/list/${data['id']}`,
        });
      });
  };

  render() {
    return (
      <div className="favorites">
        <input
          placeholder={this.state.title}
          className="favorites__name"
          onChange={this.titleChangeHandler}
          disabled={this.state.inputDisabled}
        />
        <ul className="favorites__list">
          {this.state.movies.map((item) => {
            return (
              <li className="favorites__item" key={item.imdbID}>
                {item.title} ({item.year})
                <button type="button" onClick={() => this.removeHandler(item.imdbID)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {this.state.listLink.length > 0 ? (
          <Link to={this.state.listLink} target="_blank">
            Перейти к списку
          </Link>
        ) : (
          <button
            type="button"
            className="favorites__save"
            onClick={this.saveHandler}
            disabled={!this.state.title}>
            Сохранить список
          </button>
        )}
      </div>
    );
  }
}

export default Favorites;
