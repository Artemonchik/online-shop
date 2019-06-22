import React from 'react';
import './TopViews.css'
import {Slide} from 'react-slideshow-image';
import Item from '../Item/Item.js'
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.png'
import img5 from './images/5.png'
import img6 from './images/6.png'
import img7 from './images/7.png'
import img8 from './images/8.jpg'
import img9 from './images/9.png'
import img10 from './images/10.jpg'

const properties = {
    duration: 5000,
    transitionDuration: 700,
    infinite: true,
    indicators: false,
    arrows: true,
    autoplay: false,
};

class TopViews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideImages: [
                img1,
                img2,
                img3,
                img4,
                img5,
                img6,
                img7,
                img8,
                img9,
                img10
            ]
        }
        const slideImages = this.state.slideImages.slice();
        this.state.slideImages = [];
        for (let i = 0; i < Math.floor(slideImages.length / 4) * 4; i += 4) {
            this.state.slideImages.push([slideImages[i], slideImages[i + 1], slideImages[i + 2], slideImages[i + 3]])
        }

        const la = [];
        for (let i = this.state.slideImages.length * 4; i < slideImages.length; i++) {
            la.push(slideImages[i])
        }

        this.state.slideImages.push(la);
    }

    render() {
        const {slideImages} = this.state;
        console.log(slideImages)
        return (
            <div id='top-views-block'>
                <h1 className='top-views-block__header'> Лидеры недели </h1>
                <Slide {...properties}>
                    {slideImages.map(e => {
                        return <div className='slide-block'>
                            {e.map(i=>{
                                return <Item imageSrc={i} price={200} name={'Your item'}></Item>
                            })}
                        </div>
                    })}
                </Slide>
            </div>
        )
    }

}

export default TopViews;