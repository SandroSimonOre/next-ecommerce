import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { BooksContext } from '../../context/BooksContext';
import { useContext, useEffect, useState } from 'react';
import { QuantitySetter } from "../../components/QuantitySetter";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, decrementQty, incrementQty } from '../../features/cart/cartSlice';

import { GiFeather } from 'react-icons/gi'
import { IoLibrarySharp } from 'react-icons/io5'
import { TfiCalendar } from 'react-icons/tfi'
import { GrDocument } from 'react-icons/gr'
import { IoLanguageOutline } from 'react-icons/io5'


export default function BookPage() {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [item, setItem] = useState(null)
    const { books } = useContext(BooksContext)
    const { query } = useRouter();
    const { slug } = query;
    
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);
    const book = books.find( b => b.slug === slug);
    
    useEffect(()=> {
        if (items.length > 0) {
            setItem(items.find(i => i._id == book._id && book.prices[currentIndex].format === i.format) )
        }
    }, [items, currentIndex])

    if (!book) {
        return <div>Book Not Found</div>;
    }

    const clickHandler = (e) => {
        setCurrentIndex(parseInt(e.currentTarget.id))
    }

    return (
        <Layout title={book.title}>
            <div className="py-2">
                <Link href='/'>Back to books</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-1">
                    <Image 
                        src={book.coverURL}
                        alt={book.title}
                        width={640}
                        height={900}
                        layout="responsive"
                    />
                </div>
                <div className="md:col-span-2">
                    <ul>
                        <li>
                            <h1 className="text-xl font-bold">{book.title}</h1>
                        </li>
                        <li>{book.authors.join(', ')}</li>
                        <span>{'⭐'.repeat(book.stars)}</span>
                    </ul>

                    <div className="grid grid-cols-5 text-xs py-6">
                        <div className="flex flex-col items-center justify-between px-2">
                            <p>Author(s)</p>
                            <GiFeather className="text-3xl" />
                            <p className="relative whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                { book.authors.join(', ')}
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-between px-2">
                            <p>Publisher</p>
                            <IoLibrarySharp className="text-3xl gap-y-4" />
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full">{book.publisher}</p>
                        </div>
                        <div className="flex flex-col items-center justify-between px-2">
                            <p>Publication date</p>
                            <TfiCalendar className="text-3xl" />
                            <p>{book.publicationDate.substring(0,10)}</p>
                        </div>
                        <div className="flex flex-col items-center justify-between px-2">
                            <p>Pages</p>
                            <GrDocument className="text-3xl" />
                            <p>{book.pages}</p>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-y-3">
                            <p>Language</p>
                            <IoLanguageOutline className="text-3xl" />
                            <p>{book.language}</p>
                        </div>
                    </div>

                    <div className="flex gap-1 my-4"> {/* Prices */}
                        {
                            book.prices.map((f, i) => (
                                <div 
                                    key={i}
                                    id={i}
                                    onClick={clickHandler} 
                                    className={`flex flex-col items-center border-solid border-2 border-${currentIndex === i ? 'blue' : 'grey'}-600 w-32 hover:cursor-pointer`}
                                >
                                    <div>{f.format}</div>
                                    <div>$ {f.price.toFixed(2)}</div> 
                                    <div>{currentIndex}==={i}</div>
                                </div>
                                
                            ))
                        }
                    </div>

                    <div className="flex justify-center h-12"> {/* Button or QS */}
                        {
                            item ? 
                            (
                                <div className="flex justify-center">
                                    <QuantitySetter
                                        bookId={book._id}
                                        format={book.prices[currentIndex].format}
                                        quantity={item.quantity}
                                        dispatch={dispatch}
                                        removeItem={removeItem}
                                        decrementQty={decrementQty}
                                        incrementQty={incrementQty}
                                    />
                                </div>
                            ) : (   
                                    
                                <button 
                                    type="button" 
                                    className="primary-button" 
                                    onClick={() => dispatch(addItem(
                                        {
                                            _id: book._id,
                                            quantity: 1,
                                            price: book.prices[currentIndex].price,
                                            coverURL: book.coverURL,
                                            format: book.prices[currentIndex].format,
                                            slug: book.slug
                                        }                                        
                                    ))}
                                >
                                    Add to Cart
                                </button>
                            )
                        }
                    </div>
                    
                </div>
            </div>
        </Layout>
    )   
}