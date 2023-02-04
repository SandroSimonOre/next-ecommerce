import Link from "next/link";
import Image from "next/image";
import React from "react";
import { QuantitySetter } from "./QuantitySetter";

import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, decrementQty, incrementQty } from '../features/cart/cartSlice';

export const BookCard = ({book}) => {

    const dispatch = useDispatch();
    const items = useSelector( state => state.cart.items);
    const item = items.find( e => e._id === book._id);
    return (
        <div className="flex flex-col justify-between border border-slate-300 p-3">

            <Link href={`/books/${book.slug}`} >
                <a>
                    <Image
                        className="rounded shadow"
                        src={book.coverURL}
                        alt={book.title}
                        width={600}
                        height={800}
                    />
                
                    <div className="text-sm">
                        <div className="py-0">
                            <span className="inline-block w-16">Stars:</span>
                            <span>{'⭐'.repeat(book.stars)}</span>
                        </div>
                        <div className="py-0">
                            <span className="inline-block w-16">Price:</span>
                            <span>${book.prices[0].price.toFixed(2)}</span>
                        </div>
                        <div className="py-0">
                            <span className="inline-block w-16">Format:</span>
                            <span>{book.prices[0].format}</span>
                        </div>
                        <div className="py-3 flex justify-center">
                            <span className="underline text-blue-600">{book.prices.length > 1 ? 'Click for more formats': null}</span>
                        </div>
                    </div>
                </a>
            </Link>

            {/* Button */}
            <div className="flex flex-col justify-between" >
                <div className="flex justify-center h-12">
                    {
                        !item ? (
                                <button 
                                    type="button" 
                                    className="primary-button" 
                                    onClick={() => dispatch(addItem(
                                        {
                                            _id: book._id,
                                            quantity: 1,
                                            price: book.prices[0].price,
                                            coverURL: book.coverURL,
                                            format: book.prices[0].format,
                                            slug: book.slug
                                        }                                        
                                    ))}
                                >
                                    Add to Cart
                                </button>
                            ) : (   <div className="flex justify-center">
                                        <QuantitySetter
                                            bookId={book._id}
                                            format={book.prices[0].format}
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