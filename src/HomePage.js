import React, {Component} from 'react';
import Utilities from './components/Utilities'
import SearchComponent from './components/SearchComponent';
import ErrorComponent from './components/ErrorComponent';
import LoadingComponent from './components/LoadingComponent';
import FilmsList from './components/FilmsList';

/**
 * This component is used as the Home Page of the site
 */
class HomePage extends Component {

  constructor(props) {
    super(props)
  
    // Reference to keep trach of the search component
    this.searchComponentRef = React.createRef();

    // Binding this with the event handler "onFormSubmittionFunction"
    this.onFormSubmittionFunction = this.onFormSubmittionFunction.bind(this);

    // Initiating the state
    this.state = {
       films: [],             // Array of films fetched from the API
       isLoading: false,      // Whether to show the loading block
       error: null,           // Object {message: ""} shows a error message in case of having one
       isSearchResult: false, // Whether the page currently represent the search results or simply showing films
       searchResult: []       // Array of films returned as a search result
    }
  }
  
  onFormSubmittionFunction(rawSearchValue){
    this.setState({isLoading: true} ,
      () => this.setState({searchResult: Utilities.searchForFilmsByFilmName(this.state.films, rawSearchValue), isSearchResult: true, isLoading: false})
      );
  }

  render(){
    const { films, isLoading, error, isSearchResult } = this.state;
    if (error) {
      return <ErrorComponent errorMessage={error.message} />;
    }
    if (isLoading) {
      return <LoadingComponent loadingMessage="Loading..." />;
    }
    let toShowFilms = [];
    let toShowTitle = "";
    if(!isSearchResult){
      toShowFilms = this.state.films.slice(0, 3);
      toShowTitle = "Top Movies";
    }else{
      toShowTitle = "Search results";
      toShowFilms = this.state.searchResult;
    }
    return (
      <div className="App">
        <SearchComponent ref={this.searchComponentRef} onFormSubmittionFunction={this.onFormSubmittionFunction} autoCompleteList={Utilities.extractNamesFromFilmsList(this.state.films)} />
        <FilmsList films={toShowFilms} title={toShowTitle} />
      </div>
    ); 
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(Utilities.API_LINK)
      .then(response => {
        if (response.ok) {
          const data = response.json()
          //console.log(data);
          return data;
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setState({ films: data, isLoading: false });
        this.searchComponentRef.current.focusOnSearchInput();
      })
      .catch(error => this.setState({ error: error, isLoading: false }));
  }
}


export default HomePage;
