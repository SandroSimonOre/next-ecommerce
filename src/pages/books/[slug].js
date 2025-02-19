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
import { FaRegFileAudio } from 'react-icons/fa'


export default function BookPage() {
    console.log('Loading book page') // This is temporary
    const [item, setItem] = useState(null)
    const { books } = useContext(BooksContext)
    const { query } = useRouter();
    const router = useRouter();
    const { slug } = query;
    
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);
    const book = books.find( b => b.slug === slug);
    
    useEffect(()=> {
        if (items) {
            setItem(items.find(i => i._id === book._id ) )
        } 
    }, [items])

    if (!book) {
        return <div>Book Not Found</div>;
    }

    return (
        <Layout title={book.title}>
            <div className="mx-auto py-2 pb-6 md:w-4/5">
                <button 
                    className="secondary-button"
                    onClick={()=>router.push('/')}
                >
                    Go to books
                </button>
            </div>
            
            <div className="flex flex-col md:flex-row md:w-4/5 mx-auto gap-x-16 gap-y-6">
                <div className="w-full md:w-1/3">
                    <Image 
                        src={book.coverURL}
                        alt={book.title}
                        width={640}
                        height={900}
                        layout="responsive"
                    />
                </div>
                <div className="w-full md:w-2/3">
                    <div>
                        <h1 className="text-xl font-bold">{book.title}</h1>
                        <p>{book.authors.join(', ')}</p>
                        <p>{'⭐'.repeat(book.stars)}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-y-12 text-lg md:text-xs py-6">
                      
                        <div className="flex flex-col items-center justify-between px-8">
                            <p>Author(s)</p>
                            <GiFeather className="text-3xl" />
                            <div className="w-full">
                                <p className="relative whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                    { book.authors.join(', ')}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-between px-8">
                            <p>Pages</p>
                            <GrDocument className="text-3xl" />
                            <p>{book.pages}</p>
                        </div>
                        
                        <div className="flex flex-col items-center justify-between gap-y-3 px-8">
                            <p>Format</p>
                            <FaRegFileAudio className="text-3xl" />
                            <p>{book.format}</p>
                        </div>
                        
                        <div className="flex flex-col items-center justify-between px-8">
                            <p>Publisher</p>
                            <IoLibrarySharp className="text-3xl gap-y-4" />
                            <div className="w-full">
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {book.publisher}
                                </p>
                            </div>
                        </div>
                      
                        <div className="flex flex-col items-center justify-between px-8">
                            <p>Pub. date</p>
                            <TfiCalendar className="text-3xl" />
                            <p>{book.publicationDate.substring(0,10)}</p>
                        </div>
                        
                        <div className="flex flex-col items-center justify-between gap-y-3 px-8">
                            <p>Language</p>
                            <IoLanguageOutline className="text-3xl" />
                            <p>{book.language}</p>
                        </div>

                    </div>

                    <div className="flex flex-col items-center m-12"> 
                        {/** Price */}
                        <div className="mx-auto pb-6">
                            <p className="text-3xl md:text-lg">
                                Price: <span className="font-bold">$ {book.price.toFixed(2)}</span>
                            </p>
                        </div>

                        <div className="flex gap-x-12 w-full justify-center">
                            {/** Go to cart button... */}
                            {
                                item ? 
                                (
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
                                ) : (   
                                    <div className="">   
                                        <button 
                                        type="button" 
                                        className="primary-button whitespace-nowrap" 
                                        onClick={() => dispatch(addItem(
                                            {
                                                _id: book._id,
                                                quantity: 1,
                                                title: book.title,
                                                price: book.price,
                                                coverURL: book.coverURL,
                                                format: book.format,
                                                slug: book.slug
                                            }                                        
                                        ))}
                                    >
                                        Add to Cart
                                        </button>
                                    </div>
                                )
                            }

                            {/** Go to checkout button... */}
                            {
                                items.length > 0 && 
                                <div className="">
                                    <button 
                                        className="primary-button"
                                        onClick={()=>router.push('/checkout')}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </Layout>
    )   
}