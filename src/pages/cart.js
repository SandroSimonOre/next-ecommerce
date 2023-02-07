import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQty, decrementQty } from '../features/cart/cartSlice';

import { QuantitySetter } from "../components/QuantitySetter";

export default function CartPage() {
    
    const router = useRouter()
    
    const dispatch = useDispatch();
    const items = useSelector( state => state.cart.items);

    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            <div className="flex">
                {items.length === 0 ? (
                    <div className="w-3/4">
                        Cart is empty. <Link href='/'>Go shopping</Link>
                    </div>
                ) : (
                        
                        <div className="flex flex-col w-3/4 gap-y-4">
                            <div className="grid grid-cols-12 border-y-4 border-grey-600">
                                <span className="col-span-1">Item</span>
                                <span className="col-span-5">Detail</span>
                                <span className="col-span-3 text-center">Quantity</span>
                                <span className="col-span-2 text-center">Total $</span>
                                <span className="col-span-1">Action</span>
                            </div>
                            {
                                items.map(i => (
                                    <div key= {i._id} className="grid grid-cols-12 border-b-2 border-grey-600">
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
                                    
                                        <span className="col-span-5">
                                            <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full">{i.title}</p>
                                            <p>{i.format}</p>
                                            <p>$ {i.price.toFixed(2)}</p>
                                        </span>

                                        <span className="col-span-3">
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

                        </div>
                )

                }
                <div className="w-1/4 flex flex-col border-2 ml-16 p-8">
                    <div>
                        <h2 className="font-bold h-10">Summary Purchase</h2>
                    </div>
                    <div className="grid grid-cols-2 h-8">
                        <span>Subtotal:</span>
                        <span className="text-right">
                            {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 h-8">
                        <span>Shipment:</span>
                        <span className="text-right">0.00</span>
                    </div>
                    <div className="grid grid-cols-2 h-8">
                        <span>Taxes:</span>
                        <span className="text-right">0.00</span>
                    </div>
                    <div className="grid grid-cols-2 h-8 border-t-2 font-bold">
                        <span>Total:</span>
                        <span className="text-right">
                            $ {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)}
                        </span>
                    </div>
                    <div className="my-4">
                        <button
                            className="primary-button w-full" 
                            //onClick={()=>router.push('login?redirect=/checkout')}
                            //onClick={()=>router.push('checkout')}
                            onClick={()=>router.push('/login?redirect=/checkout')}
                        >
                                    Check out
                        </button>
                    </div>
                </div>    
            </div>
        </Layout>
    )
}