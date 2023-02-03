import Link from "next/link";
import Image from "next/image";
import React from "react";
//import { useSelector, useDispatch } from 'react-redux';
//import { addItem, removeItem, decrementQty, incrementQty } from '../features/cart/cartSlice';


export const BookCard = ({book}) => {

    //const dispatch = useDispatch();
    //const items = useSelector( state => state.cart.items);
    //const item = items.find( e => e.id === product.id);
    return (
        <div className="card">

            <Link href={`/books/${book.slug}`}>
                <a>
                    <Image
                        className="rounded shadow"
                        src={book.coverURL}
                        alt={book.title}
                        width={500}
                        height={500}

                    />
                </a>
            
            </Link>

            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/books/${book.slug}`}>
                    <a>
                        <h2 className="text-lg">{book.title}</h2>
                    </a>
                </Link>
                {/* <p className="mb-2">{product.brand}</p> */}
                <p>${book.prices[0].price}</p>

                {/* {
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
                } */}
                
                

            </div>          
        </div>
    )
}