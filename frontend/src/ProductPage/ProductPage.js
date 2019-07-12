import React from 'react';
import './ProductPage.css';
import img1 from '../products-images/yellowtshirt.webp'
import SelectSize from './SelectSize/SelectSize.js'
import SelectColor from './SelectColor/SelectColor.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
        };

        this.handleCountChange = this.handleCountChange.bind(this)
    }

    handleCountChange(e) {
        const n = e.target.value;
        if (Number(n) >= 0 || n === '') {
            this.setState({quantity: n,})
        }
    }

    render() {
        const {quantity} = this.state;

        return (
            <div id='product-page'>
                <div id='product-block'>
                    <p>full path to this product</p>
                    <div id='product-page__image-block'>
                        <img className='product-page__image-block__img' src={img1}/>
                        <p className='product_page__description-block'>Это описание товара. Здесь вы можете рассказать
                            о товаре подробнее: напишите о размерах, материалах, уходе и любых других важных моментах.
                        </p>
                    </div>
                    <div id='product-page__parameter-block'>
                        <h1 className='product-page__item-name'>Ваш товар</h1>
                        <p className='product-page__item-price'>450,00 ₽</p>
                        <div className='product-block__text'>

                            <SelectSize>
                            </SelectSize>

                        </div>
                        <div className='product-block__text'>
                            <SelectColor>
                            </SelectColor>
                        </div>
                        <div>
                            {/*<p style={{marginBottom:0}}>Выбор количества товара</p>*/}
                            <TextField
                                className={'select-count'}
                                id="standard-number"
                                label="Количество"
                                value={quantity}
                                onChange={this.handleCountChange}
                                type="number"
                                // className={}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <Button variant="outlined" className='submit-button'>
                                Добавить в корзину
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductPage;