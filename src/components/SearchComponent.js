import React, { Component } from 'react'

/**
 * This component creates the search input with the search button
 * props: {
 *      autoCompleteList: array, array of film's names to use in the auto-complete
 *      onFormSubmittionFunction: function, is called from the parent element when the search form is submitted
 * }
 */

class SearchComponent extends Component {

    constructor(props) {
        super(props)
        // Reference of the search input
        this.searchInputRef = React.createRef();

        this.state = {
            inputValue: ""      // Initial value of the search input
        }
    }
    
    // Focuses the cursor on the search input
    focusOnSearchInput = () => {
        this.searchInputRef.current.focus();
    }

    // Handler that called when the search input is change
    inputIsChangedHandler = (event) => {
        // Keep the value of the input related with the state at all times
        this.setState({
            inputValue: event.target.value
        });
    }

    // Handler that is called when form is submitted:
    //      - user clicks on Search button
    //      - user clicks on Enter key
    formIsSubmittedHandler = (event) => {
        event.preventDefault();
        // The parent is informed that the form was submitted
        this.props.onFormSubmittionFunction(this.searchInputRef.current.value.trim().toLowerCase());
    }

    render() {
        return (
            <div className="search-component">
                <form onSubmit={this.formIsSubmittedHandler}>
                    <input type="text" value={this.state.inputValue} ref={this.searchInputRef} onChange={this.inputIsChangedHandler} list="filmNames" placeholder="example: The Joker" />
                    <datalist id="filmNames">
                        {
                            this.props.autoCompleteList.map(name => (<option value={name} key={name}></option>))
                        }
                    </datalist>
                    <button type="submit"><img src="/magnifying-glass.png" alt="Search" /></button>
                </form>
            </div>
        )
    }
}

export default SearchComponent
