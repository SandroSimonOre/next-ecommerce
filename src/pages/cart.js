import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//import { useContext } from "react";
import { Layout } from "../components/Layout";

import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQty, decrementQty } from '../features/cart/cartSlice';

export default function CartPage() {
    
    const router = useRouter()
    
    const dispatch = useDispatch();
    const items = useSelector( state => state.cart.items);
    
    const removeItemHandler = (id) => {
        
        dispatch( removeItem(id) )

    }

    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {items.length === 0 ? (
                <div>
                    Cart is empty. <Link href='/'>Go shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Unit. Price</th>
                                    <th className="p-5 text-right">Total Price</th>
                                    
                                </tr>

                            </thead>
                            <tbody>
                                {items.map( item => (
                                    <tr key= {item.id} className="border-b">
                                        <td>
                                            <Link href={`/product/${item.slug}`}>
                                                <a className="flex items-center">
                                                    <Image
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        width={50}
                                                        height={50}
                                                    ></Image>
                                                    &nbsp;
                                                    {item.title}
                                                </a>
                                            </Link>
                                        </td>
                                        <td /* className="p-5 text-right" */>
                                        <div>
                                            {   
                                                item.quantity === 1 
                                                    ? <button onClick={ ()=> dispatch(removeItem(item.id)) }>❌</button>
                                                    : <button onClick={ ()=> dispatch(decrementQty(item.id))}>➖</button>
                                            }
                                            <span>{item.quantity}</span>
                                            <button onClick={ ()=> dispatch(incrementQty(item.id)) }>➕</button>
                                        </div>
                                        </td>
                                        <td className="p-5 text-right">${item.price}</td>
                                        <td className="p-5 text-right">${item.price * item.quantity}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 text-xl">  
                                    <span>Subtotal: $</span>
                                    {items.reduce((a, c) => a + c.quantity * c.price, 0)}
                                </div>
                            </li>
                            <li>
                                <button
                                    className="primary-button w-full" 
                                    //onClick={()=>router.push('login?redirect=/checkout')}
                                    //onClick={()=>router.push('checkout')}
                                    onClick={()=>router.push('/login?redirect=/checkout')}
                                >
                                    Check out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )

            }
        </Layout>
    )
}