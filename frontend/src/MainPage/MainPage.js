import React from 'react';
import Head from '../Head/Head.js'
import './MainPage.css'
import Slider from './MySlider.js'
import dollar from './images/dollar.png'
import lightning from './images/lightning.png'
import rocket from './images/rocket.png'
import Navigation from '../Navigation/Navigation.js'
import TopViews from '../TopViews/TopViews.js'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='main-page'>
                <Slider/>
                <div className='bonuses'>
                    <img className='bonuses__icons' src={lightning}/>
                    <div className='bonuses__child'>

                        Возврат и обмен бесплатно
                    </div>
                    <img className='bonuses__icons' src={dollar}/>
                    <div className='bonuses__child'>

                        Скидка 10% по промокоду: ArtemPokemon
                    </div>
                    <img className='bonuses__icons' src={rocket}/>
                    <div className='bonuses__child'>
                        Бесплатная доставка по Омску
                    </div>

                </div>
                <Navigation></Navigation>
                <TopViews></TopViews>
            </div>
        )
    }
}

export default MainPage;