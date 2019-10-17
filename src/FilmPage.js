import React, { Component } from 'react'
import Utilities from './components/Utilities'
import ErrorComponent from './components/ErrorComponent';
import LoadingComponent from './components/LoadingComponent';

/**
 * This component is used as the Single Film page
 */

class FilmPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: true,        // Is page loading
            error: null,            // Is there an error
            film: {}                // Film object
        }
    }
    
    // Function to strip a string from html tags (used with the film's summary attribute)
    strip_html_tags(str)
    {
    if ((str===null) || (str===''))
        return false;
    else
    str = str.toString();
    return str.replace(/<[^>]*>/g, '');
    }

    render() {
        const {film, isLoading, error} = this.state;
        if (error) {
            return <ErrorComponent errorMessage={error.message} />;
        }
        if (isLoading) {
            return <LoadingComponent loadingMessage="Loading..." />;
        }
        let image = film.show.image;
        if(!image || !image.hasOwnProperty('original')){
            image = {original: '/empty-image.png'}
        }
        console.log(film);
        return (
            <div className="film-page">
                <div className="film-poster-image" style={{backgroundImage : `url(${image.original})`}}>
                    <div className="film-information">
                        <div className="column">
                            <h1>{film.show.name}</h1>
                            <p><b>Language: </b>{film.show.language}</p>
                            <p><b>Premiered: </b>{film.show.premiered}</p>
                            <p><b>Type: </b>{film.show.type}</p>
                            <p><b>Summary: </b></p>
                            <p>{this.strip_html_tags(film.show.summary)}</p>
                        </div>
                        <div className="column">
                            <p><b>Genres: </b>{film.show.genres.map(genre=> (
                                <span className="film-genre" key={genre}>{genre}</span>
                            ))}</p>
                            <p><b>Rating:</b> {film.show.rating.average}</p>
                            <p className="film-rating-container"><span className="film-rating" style={{width: `${(film.show.rating.average * 10)}%`}}></span></p>
                            <p><b>Show days: </b>{film.show.schedule.days.map(day=> (
                                <span className="film-day" key={day}>{day}</span>
                            ))}</p>
                            <p><b>Timing: </b>{film.show.schedule.time}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


  componentDidMount() {
    const {id} = this.props.match.params
    this.setState({ isLoading: true })
    fetch(Utilities.API_LINK)
    .then(response => {
        if (response.ok) {
            const data = response.json()
            return data;
        } else {
            throw new Error('Something went wrong ...');
        }
    })
    .then(data => {
        const film = Utilities.findFilmById(data, id);
        if(!film){
            throw new Error('Film not found!');
        }
        this.setState({ film: film, isLoading: false });
    })
    .catch(error => this.setState({ error: error, isLoading: false }));
  }
}

export default FilmPage
