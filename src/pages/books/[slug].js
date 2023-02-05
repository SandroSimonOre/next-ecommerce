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
    const { books } = useContext(BooksContext)
    const { query } = useRouter();
    const { slug } = query;
    
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);
    const book = books.find( b => b.slug === slug);
    const item = items.find(e => e._id === book._id )
    //console.log(item)

    useEffect(()=> {
        if (item) {
            console.log(book.prices)
            setCurrentIndex(book.prices.findIndex(p => p.format === item.format)) 
            console.log(item.format)
        }
    }, [])
    /* const addToCartHandler = () => {
        dispatch(addItem(book) );
    } */
    console.log(currentIndex)

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
                        <div className="flex flex-col items-center justify-between gap-y-4">
                            <p>Author(s)</p>
                            <GiFeather className="text-3xl" />
                            <div>
                                {
                                    book.authors.map((a, i) => ( <p key={i}>{a}</p> ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-y-4">
                            <p>Publisher</p>
                            <IoLibrarySharp className="text-3xl gap-y-4" />
                            <p>{book.publisher}</p>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-y-4">
                            <p>Publication date</p>
                            <TfiCalendar className="text-3xl" />
                            <p>{book.publicationDate.substring(0,10)}</p>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-y-4">
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

                    <div className="flex gap-1 my-4">
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
                                </div>
                                
                            ))
                        }
                    </div>
                    <div className="flex justify-center h-12">
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
                                        price: book.prices[0].price,
                                        coverURL: book.coverURL,
                                        format: book.prices[0].format,
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
                <div>
                    
                </div>
                
            </div>
        </Layout>
    )   
}