import React from 'react';
import './Head.css'
import Icon from './basket.png';
import {NavLink, BrowserRouter as Router} from 'react-router-dom'

class Head extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const toggleCart = this.props.toggleCart;
        return (
            <div id='head'>
                <div id='head__button-panel'>
                    <div id='head__button-block'>
                        <NavLink exact to='/' className='head-button' activeClassName='head-button__pressed'>ГЛАВНАЯ</NavLink>
                        <div to='/' className='head-button'>О НАС</div>
                        <NavLink to='/product-list/men' className='head-button'
                                 activeClassName='head-button__pressed'>МУЖЧИНАМ</NavLink>
                        <NavLink to='/product-list/women' className='head-button'
                                 activeClassName='head-button__pressed'>ЖЕНЩИНАМ</NavLink>
                        <div className='head-button'>ЛУК-БУК</div>
                        <div className='head-button'>СВЯЗЬ</div>
                        <div onClick={toggleCart} className='head-button head-button__icon'>
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