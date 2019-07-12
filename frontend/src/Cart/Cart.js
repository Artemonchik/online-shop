import React from 'react';
import './Cart.css'
import Button from '@material-ui/core/Button';
import {StylesProvider} from '@material-ui/styles';

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {isActivated, toggleCart} = this.props;
        console.log(isActivated);
        return (
            <div id='cart-block' style={{display: isActivated ? "block" : "none"}}>
                <div id='cart-block__right-side'>
                    <StylesProvider injectFirst>
                        <div id='top-container'>
                            <div>
                                <h1> Корзина</h1>
                            </div>
                            <div>
                                <Button onClick={toggleCart} className='close-button'>
                                    Закрыть
                                </Button>
                            </div>

                        </div>
                    </StylesProvider>

                </div>
            </div>
        )
    }

}

export default Cart;