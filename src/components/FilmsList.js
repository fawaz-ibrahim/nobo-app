import React, { Component } from 'react'
import FilmThumbnail from './FilmThumbnail'
import ErrorComponent from './ErrorComponent';

/**
 * This component is used to show a list of films as a three-columned grid
 * props : {
 *      title: string, the title of the list being showed
 *      films: array, array of the films to be displayed
 * }
 */

class FilmsList extends Component {

    render() {
        const {title , films} = this.props;
        if(!films.length){
            // This code is executed in case if the films array was empty
            return (
            <React.Fragment>
                <h3 className="text-center">{title}</h3>
                <div className="film-list-container">
                    <div className="films-list">
                        <ErrorComponent errorMessage="No items found!" />
                    </div>
                </div>
            </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <h3 className="text-center">{title}</h3>
                <div className="film-list-container">
                    <div className="films-list">
                        {
                            films.map(film => <FilmThumbnail film={film} key={film.show.id} />)
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FilmsList
