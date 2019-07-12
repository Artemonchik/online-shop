import React from 'react';
import './App.css';
import MainPage from './MainPage/MainPage.js'
import Head from "./Head/Head";
import ProductList from "./ProductList/ProductList";
import ProductPage from './ProductPage/ProductPage.js'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Cart from './Cart/Cart.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {cartIsActivated:false};
        this.toggleCart = this.toggleCart.bind(this)
    }

    toggleCart(){
        if(this.state.cartIsActivated === true){
            this.setState({cartIsActivated:false})
        }else{
            this.setState({cartIsActivated:true})
        }
    }
    render() {
        const {cartIsActivated} = this.state;
        return (
            <div className="App">
                <Cart isActivated={cartIsActivated} toggleCart={this.toggleCart}/>
                <Router>
                    <Head toggleCart={this.toggleCart}/>
                    <Switch>
                        <Route exact path='/' component={MainPage}/>
                        <Route path='/item/:id' component={ProductPage}/>
                        <Route path='/product-list/:sex' component={ProductList}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
