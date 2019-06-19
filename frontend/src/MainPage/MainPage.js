import React from 'react';
import Head from '../Head/Head.js'
import Content from '../Content/Content.js'
import './MainPage.css'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Head/>
                <Content>
                    <div className='inscription'> Классные футболки </div>
                    <div className='lowerinscription'>Интернет - магазин футболок</div>
                    {/*<ImageSlideShow></ImageSlideShow>*/}
                    {/*<ImageMenu></ImageMenu>*/}
                    {/*<TopViews></TopViews>*/}
                    {/*<Footer></Footer>*/}
                </Content>
            </div>
        )
    }
}

export default MainPage;