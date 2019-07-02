import React from 'react';
import './ProductPage.css';
import img1 from'../products-images/yellowtshirt.webp'

class ProductPage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div id='product-page'>
                <div id='product-block'>
                    <p>full path to this product</p>
                    <div id='product-page__image-block'>
                        <img className='product-page__image-block__img' src={img1}/>
                        <p>Данный блок несёт очень важное и чудейснейшее описание данного товара </p>
                    </div>
                    <div id='product-page__parameter-block'>
                        <h1 className='product-page__item-name'>Ваш товар</h1>
                        <p className='product-page__item-price'>450,00 ₽</p>
                        <div>
                            <p className='product-block__text'> Размер </p>
                        </div>
                        <div> Выбор цвета товара</div>
                        <div> Выбор количества товара</div>
                        <div> Блок добавить в корзину</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductPage;