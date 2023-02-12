import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQty, decrementQty, emptyCart } from '../features/cart/cartSlice';

import { QuantitySetter } from "../components/QuantitySetter";

export default function CartPage() {
    
    const router = useRouter()
    
    const dispatch = useDispatch();
    const items = useSelector( state => state.cart.items);

    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl mx-16">Shopping Cart</h1>
            <div className="flex flex-col mx-16">
                {items.length === 0 ? (
                    <div className="w-3/4">
                        Cart is empty. <Link href='/'>Go shopping</Link>
                    </div>
                ) : (
                        
                        <div className="flex flex-col w-full">
                            <div className="grid grid-cols-12 border-y-2 h-12 border-gray-200 font-bold items-center">
                                <span className="col-span-1">Item</span>
                                <span className="col-span-5">Detail</span>
                                <span className="col-span-3 text-center">Quantity</span>
                                <span className="col-span-2 text-center">Total $</span>
                                <span className="col-span-1">Action</span>
                            </div>
                            {
                                items.map(i => (
                                    <div key= {i._id} className="grid grid-cols-12 even:bg-gray-100 items-center py-1">
                                        <span className="col-span-1">
                                            <Link href={`/books/${i.slug}`}>
                                                <a className="flex items-center">
                                                    <Image
                                                        src={i.coverURL}
                                                        alt={i.title}
                                                        width={40}
                                                        height={60}
                                                    />
                                                </a>
                                            </Link>
                                        </span>
                                    
                                        <span className="col-span-5"> {/** Detail */}
                                            <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full">{i.title}</p>
                                            <p>{i.format}</p>
                                            <p>$ {i.price.toFixed(2)}</p>
                                        </span>

                                        <span className="col-span-3"> {/** Quantity */}
                                            <QuantitySetter
                                                bookId={i._id}
                                                quantity={i.quantity}
                                                dispatch={dispatch}
                                                removeItem={removeItem}
                                                decrementQty={decrementQty}
                                                incrementQty={incrementQty}
                                            />
                                        </span>

                                        <span className="col-span-2 text-right pr-8">
                                            {(i.price * i.quantity).toFixed(2)}
                                        </span>

                                        <span 
                                            className="col-span-1 cursor-pointer text-red-600 font-bold" 
                                            onClick={()=> dispatch(removeItem({_id: i._id}))}
                                        >
                                                Remove
                                        </span>
                                    </div>
                                ))
                            }

                            <div className="grid grid-cols-12 border-double border-t-8 border-grey-600 pt-2">
                                <span className="col-span-9 text-right font-bold">
                                    Total
                                </span>
                                <span className="col-span-2 text-right pr-8 font-bold">
                                    $ {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)}
                                </span>
                            </div>

                        </div>
                )

                }

                <div className="flex w-1/2 mx-auto mt-12">
                    <div className="mx-2">
                        <button className="secondary-button" onClick={()=>router.push('/')}>
                            {items.length > 0 ? "Continue shopping" : "Go Shopping"}
                        </button>
                    </div>
                    <div className="mx-2">
                        {
                            items.length > 0 &&
                                <button 
                                    className="secondary-button" 
                                    onClick={()=> dispatch(emptyCart())}
                                >
                                    Empty Cart
                                </button>
                        }
                        
                    </div>
                    <div className="mx-2">
                        {
                            items.length > 0 && 
                            <button 
                                className="primary-button"
                                //onClick={()=>router.push('/login?redirect=/checkout')}
                                onClick={()=>router.push('/checkout')}
                            >
                                Checkout
                            </button>
                        }
                    </div>
                    
                </div>
                    
            </div>
        </Layout>
    )
}