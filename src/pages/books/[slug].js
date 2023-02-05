import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice';
import { BooksContext } from '../../context/BooksContext';
import { useContext } from 'react';

import { GiFeather } from 'react-icons/gi'
import { IoLibrarySharp } from 'react-icons/io5'
import { TfiCalendar } from 'react-icons/tfi'
import { GrDocument } from 'react-icons/gr'
import { IoLanguageOutline } from 'react-icons/io5'


export default function BookPage() {

    // const cart = useSelector((state) => state.cart);
    //const dispatch = useDispatch();
    const {books} = useContext(BooksContext)
    
    
    const {query} = useRouter();
    const {slug} = query;
    const book = books.find( b => b.slug === slug);
    
    if (!book) {
        return <div>Book Not Found</div>;
    }

    const addToCartHandler = () => {
        dispatch(addItem(book) );
        //router.push('/cart')
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
                                <div key={i} className="flex flex-col items-center border-solid border-2 border-grey-600 w-32 hover:cursor-pointer">
                                    <div>{f.format}</div>
                                    <div>$ {f.price.toFixed(2)}</div> 
                                </div>
                                
                            ))
                        }
                    </div>
                    <button className="primary-button w-36" onClick={addToCartHandler}>Add to Cart</button>
                    
                </div>
                <div>
                    
                </div>
                
            </div>
        </Layout>
    )   
}