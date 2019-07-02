import React from 'react';
import './Head.css'
import Icon from './basket.png';

class Head extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='head'>
                <div id='head__button-panel'>
                    <div id='head__button-block'>
                        <div className='head-button'>ГЛАВНАЯ</div>
                        <div className='head-button'>О НАС</div>
                        <div className='head-button'>МУЖЧИНАМ</div>
                        <div className='head-button'>ЖЕНЩИНАМ</div>
                        <div className='head-button'>ЛУК-БУК</div>
                        <div className='head-button'>СВЯЗЬ</div>
                        <div className='head-button head-button__icon'>
                            <img id='head-icon' src={Icon}/>
                        </div>
                    </div>
                </div>
                <div className='inscription'> Классные футболки</div>
                <div className='lowerinscription'>Интернет - магазин футболок</div>
            </div>
        )
    }
}

export default Head;