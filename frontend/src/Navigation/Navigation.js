import React from 'react';
import './Navigation.css'
import women from './images/women.jpg'
import men from './images/men.jpg'
import newCollection from './images/new-collection.jpg'

class Navigation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id='navigation-block'>
                {/*<div className='navigation-block__left-side'>*/}
                <div className='navigation-block__img-left' style={{'backgroundImage':`url(${women})`}}>
                    <span>Женская  <br/>коллекция </span>
                </div>
                <div className='navigation-block__img-right' style={{'backgroundImage':`url(${newCollection})`}}>
                    <span>Мужская <br/> коллекция</span>
                </div>
                <div className='navigation-block__img-left' style={{'backgroundImage':`url(${men})`}}>
                    <span> Новые <br/> коллекции </span>
                </div>
                {/*</div>*/}
                {/*<div className='navigation-block__right-side'>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Navigation;