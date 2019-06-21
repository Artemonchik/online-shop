import React from 'react';
import './MainPage.css'
import women from './images/women.jpg'
import men from './images/men.jpg'
import newCollection from './images/new-collection.jpg'

class TopViews extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id='top-views-block'>
                {/*<div className='top-views-block__left-side'>*/}
                <div className='top-views-block__img-left' style={{'backgroundImage':`url(${women})`}}>
                    <span>Женская  <br/>коллекция </span>
                </div>
                <div className='top-views-block__img-right' style={{'backgroundImage':`url(${newCollection})`}}>
                    <span>Мужская <br/> коллекция</span>
                </div>
                <div className='top-views-block__img-left' style={{'backgroundImage':`url(${men})`}}>
                    <span> Новые <br/> коллекции </span>
                </div>
                {/*</div>*/}
                {/*<div className='top-views-block__right-side'>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default TopViews;