import React, { Component } from 'react'
import { Link } from "react-router-dom";

/**
 * This component is used to shpw a single film item in the grid
 * props: {
 *      film: object, the object extracted from the fetched list of films
 * }
 */

class FilmThumbnail extends Component {
    render() {
        const {film} = this.props;
        let image = film.show.image;
        if(!image || !image.hasOwnProperty('medium')){
            image = {medium: '/empty-image.png'}
        }
        return (
            <Link className="film-thumbnail" to={`/film/${film.show.id}`}>
                <span className="film-thumbnail-image-container">
                    <img src={image.medium} className="film-thumbnail-image" alt={film.show.name}/>
                </span>
                <span className="film-thumbnail-title">{film.show.name}</span>
            </Link>
        )
    }
}

export default FilmThumbnail
