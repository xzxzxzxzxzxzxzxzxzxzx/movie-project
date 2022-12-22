import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ListPage.css';

class ListPage extends Component {
    state = {
        title: '',
        movies: [
            
        ]
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({title: data['title']});
            
            data['movies'].forEach(imdbID => {
                fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=5636c888`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const {Title, Year, imdbID} = {...data};
                    this.setState({
                        movies: [...this.state.movies, {title: Title, year: Year, imdbID: imdbID}]
                    })
                });
            });
        });
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;