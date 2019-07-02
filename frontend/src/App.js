import React from 'react';
import './App.css';
import MainPage from './MainPage/MainPage.js'
import Head from "./Head/Head";
import ProductList from "./ProductList/ProductList";
import ProductPage from './ProductPage/ProductPage.js'
function App() {
    return (
        <div className="App">
            <Head/>
            <ProductPage>{'mew'}</ProductPage>

        </div>
    );
}

export default App;
