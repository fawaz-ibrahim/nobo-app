import React, { Component } from 'react'

/**
 * This component is used just to diplay an error block with a message
 * props{
 *      errorMessage: string , the message to show inside the block
 * }
 */

class ErrorComponent extends Component {
    render() {
        return (
            <div className="error">
                {this.props.errorMessage}    
            </div>
        )
    }
}

export default ErrorComponent
