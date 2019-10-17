/**
 * This is a helper class that is accessible any where with its static methods
 */
class Utilities{

    // The link of the API of films
    static API_LINK = "https://api.tvmaze.com/search/shows?q=test"

    /**
     * Takes an array of films objects as input and returns an array
     *  of these films' names as output
     * 
     * @param {Array} films 
     * 
     * @returns {Array}
     */
    static extractNamesFromFilmsList(films){
        let names = [];
        for(let i in films){
            names.push(films[i].show.name)
        }
        return names;
    }

    /**
     * Takes an array of films objects, name of a film as inputs and
     *  returns array of films that matches the search criteria
     * @param {Array} films 
     * @param {String} name 
     * 
     * @returns {Array}
     */
    static searchForFilmsByFilmName(films, name){
        return films.filter(film => (film.show.name.toLowerCase().indexOf(name) > -1));
    }

    /**
     * Takes an array of films objects, id of a film as inputs and
     *  returns the film with this id
     * @param {Array} films 
     * @param {Number} id 
     * 
     * @returns {Object}
     */
    static findFilmById(films, id){
        return films.find(film => (parseInt(film.show.id) == parseInt(id)));
    }
}

export default Utilities
