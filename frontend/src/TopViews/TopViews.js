import React from 'react';
import './TopViews.css'
import {Slide} from 'react-slideshow-image';
import Item from '../Item/Item.js'
import img1 from '../products-images/badboy.jpg'
import img2 from '../products-images/darkcostume.jpg'
import img3 from '../products-images/hoodie.jpg'
import img4 from '../products-images/jeans.jpg'
import img5 from '../products-images/mantshirt.jpg'
import img6 from '../products-images/redskirt.jpg'
import img7 from '../products-images/nicewoman.jpg'
import img8 from '../products-images/whitedress.jpg'
import img9 from '../products-images/t-shirt.jpg'
import img10 from '../products-images/goodboy.jpg'

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
        return (
            <div id='top-views-block'>
                <h1 className='top-views-block__header'> Лидеры недели </h1>
                <Slide {...properties}>
                    {slideImages.map(e => {
                        return <div className='slide-block'>
                            {e.map(i=>{
                                return <Item imageSrc={i} price={200} name={'Your item'}/>
                            })}
                        </div>
                    })}
                </Slide>
            </div>
        )
    }

}

export default TopViews;