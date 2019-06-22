import React from 'react';
import Head from '../Head/Head.js'
import Content from '../Content/Content.js'
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
            <div>
                <Head/>
                <Content>
                    <div className='inscription'> Классные футболки</div>
                    <div className='lowerinscription'>Интернет - магазин футболок</div>
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
                </Content>
            </div>
        )
    }
}

export default MainPage;