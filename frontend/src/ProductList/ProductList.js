import React from 'react';
import './ProductList.css';
import Item from '../Item/Item.js';

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
import img11 from '../products-images/sweatpants.jpg'


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                {
                    name: 'Чёрный костюм',
                    price: 6000,
                    imageSrc: img1
                },
                {
                    name: 'Тёмный костюм',
                    price: 890,
                    imageSrc: img2
                },
                {
                    name: 'Кофта с капюшоном',
                    price: 3100,
                    imageSrc: img3
                },
                {
                    name: 'Джинсы',
                    price: 4200,
                    imageSrc: img4
                },
                {
                    name: 'Мужская футболка',
                    price: 4100,
                    imageSrc: img5
                },
                {
                    name: 'Красное платье',
                    price: 2400,
                    imageSrc: img6
                },
                {
                    name: 'Костюмчик',
                    price: 4230,
                    imageSrc: img7
                },
                {
                    name: 'Белое платье',
                    price: 6400,
                    imageSrc: img8
                },
                {
                    name: 'Футболка',
                    price: 800,
                    imageSrc: img9
                },
                {
                    name: 'Не продается',
                    price: 400000,
                    imageSrc: img10
                },
                {
                    name: 'Спортивные штаны',
                    price: 1000,
                    imageSrc: img6
                },
            ]
        }
    }

    render() {
        const {images} = this.state;
        return (

            <div id='product-list-block'>
                <h1 className='product-list-block__title'> Мужская коллекция</h1>
                <div id='product-list-block__list'>
                    {images.map(image => {
                        return <Item {...image}/>
                    })}
                </div>
            </div>
        )
    }
}

export default ProductList;