import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { QuantitySetter } from "./QuantitySetter";

import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, decrementQty, incrementQty } from '../features/cart/cartSlice';

export const BookCard = ({book}) => {

    const dispatch = useDispatch();
    const items = useSelector( state => state.cart.items);
    const item = items.find( e => e._id === book._id);

    // remove this, it is temporal
    useEffect(()=>{
        console.log('Renderizando Card')
    }, [items])

    function handleClickAddToCart() {
        dispatch(addItem(
            {
                _id: book._id,
                title: book.title,
                quantity: 1,
                price: book.price,
                coverURL: book.coverURL,
                format: book.format,
                slug: book.slug
            }                                        
        ))
    }

    // This is temporary
    function handleClickCard(){
        console.log("Going to the book page...")
    }

    return (
        <div className="flex flex-col justify-between border border-slate-300 md:p-3">

            <Link href={`/books/${book.slug}`}>
                <a onClick={handleClickCard}>
                    <Image
                        className="rounded shadow"
                        src={book.coverURL}
                        alt={book.title}
                        width={600}
                        height={800}
                    />
                
                    <div className="p-2 md:px-0 text-lg md:text-sm">
                        <div className="">
                            <span className="inline-block w-20 md:w-16">Stars:</span>
                            <span>{'⭐'.repeat(book.stars)}</span>
                        </div>
                        <div className="">
                            <span className="inline-block w-20 md:w-16">Price:</span>
                            <span>${book.price.toFixed(2)}</span>
                        </div>
                        <div className="">
                            <span className="inline-block w-20 md:w-16">Format:</span>
                            <span>{book.format}</span>
                        </div>
                    </div>
                </a>
            </Link>

            {/* Button */}
            <div className="flex flex-col justify-between" >
                <div className="flex justify-center my-6">
                    {
                        !item 
                            ? (
                                <button 
                                    type="button" 
                                    className="primary-button" 
                                    onClick={handleClickAddToCart}
                                >
                                    Add to Cart
                                </button>
                            ) : (   
                                    <div className="flex justify-center">
                                        <QuantitySetter
                                            bookId={book._id}
                                            quantity={item.quantity}
                                            dispatch={dispatch}
                                            removeItem={removeItem}
                                            decrementQty={decrementQty}
                                            incrementQty={incrementQty}
                                        />
                                    </div>
                            )
                    }
                </div>
            </div>          
        </div>
    )
}