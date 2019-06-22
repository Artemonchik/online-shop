import React from 'react';
import './Item.css';

class Item extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {imageSrc, price, name} = this.props
        return (
            <div className='item-block'>
                <div style={{backgroundImage: `url(${imageSrc})`}} className='item-block__img-block'/>
                <div className='item-block__name'>{name}</div>
                <div className='item-block__price'>{price}</div>
            </div>
        )
    }
}

export default Item;