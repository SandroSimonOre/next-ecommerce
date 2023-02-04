import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice';
import { BooksContext } from '../../context/BooksContext';
import { useContext } from 'react';


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
                        height={640}
                        layout="responsive"
                    />
                </div>
                <div className="md:col-span-2">
                    <ul>
                        <li>
                            <h1 className="text-lg">{book.title}</h1>
                        </li>
                        <li>Category: {book.category}</li>
                        <li>Description: {book.summary}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${book.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            {/* <div>{book.stock > 0 ? 'In stock' : 'Unavailable'}</div> */}
                        </div>

                        <button className="primary-button w-full" onClick={addToCartHandler}>Add to Cart</button>

                    </div>
                </div>
                
            </div>
        </Layout>
    )   
}