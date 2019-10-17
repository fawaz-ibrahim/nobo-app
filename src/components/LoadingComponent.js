import React, { Component } from 'react'

/**
 * This component is used just to diplay a loading block with a message
 * props{
 *      loadingMessage: string , the message to show inside the block
 * }
 */

class LoadingComponent extends Component {
    render() {
        return (
            <div className="loading">
                {this.props.loadingMessage}
            </div>
        )
    }
}

export default LoadingComponent
