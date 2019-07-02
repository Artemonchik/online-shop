import React from 'react';
import './MainPage.css'
import path from 'path';
import {Slide} from 'react-slideshow-image';
import img1 from './images/1.jpeg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'

const properties = {
    duration: 5000,
    transitionDuration: 700,
    infinite: true,
    indicators: true,
    arrows: false
};

class MySlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.slideImages = [img1, img2, img3];

    }

    render() {

        const {slideImages} = this.state;
        const result = (
            <Slide {...properties}>
                {slideImages.map((e,i) => {
                    return (
                        <div key={e} className="each-slide">
                            <div style={{backgroundImage: `url(${e})`,}} className='slide-image'>
                            </div>
                        </div>
                    )
                })}
            </Slide>
        );
        return result
    }
}

export default MySlider;
