import React from 'react';
import './Content.css'

class Content extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        const {children} = this.props;
        return (
            <div id='content'>
                {children}
            </div>
        )
    }
}

export default Content