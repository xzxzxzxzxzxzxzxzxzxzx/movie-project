import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../redux/store';
import { fetchMoviesAction } from '../../redux/actions';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        const { searchLine } = {...this.state};

        fetch(`https://www.omdbapi.com/?s=${searchLine}&apikey=5636c888`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data['Response'] == 'False') return;
            store.dispatch(fetchMoviesAction(data['Search']));
        });
    }
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;