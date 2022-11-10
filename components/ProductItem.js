import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, decrementQty, incrementQty } from '../features/cart/cartSlice';


export const ProductItem = ({product}) => {

    const dispatch = useDispatch();
    const items = useSelector( state => state.cart.items);
    const item = items.find( e => e.id === product.id);
    return (
        <div className="card">

            <Link href={`/product/${product.slug}`}>
                <a>
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="rounded shadow" 
                    />
                </a>
            
            </Link>

            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className="text-lg">{product.title}</h2>
                    </a>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p>${product.price}</p>

                {
                    !item
                        ?
                            <button type="button" className="primary-button" onClick={() => dispatch(addItem(product))}>
                                Add to Cart
                            </button>
                        :   <div>
                                {   
                                    item.quantity === 1 
                                        ? <button onClick={ ()=> dispatch(removeItem(product.id)) }>❌</button>
                                        : <button onClick={ ()=> dispatch(decrementQty(product.id))}>➖</button>
                                }
                                <span>{item.quantity}</span>
                                <button onClick={ ()=> dispatch(incrementQty(product.id)) }>
                                ➕
                                </button>
                            </div>
                }
                
                

            </div>          
        </div>
    )
}