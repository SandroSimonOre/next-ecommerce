import { signOut, useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Link from "next/link";
//import { Store } from "../utils/Store";
import DropdownLink from './DropdownLink'; // REVIEW THIS CODE

import { useSelector } from 'react-redux';

export const Layout = ({title, children}) => {

    const { status, data: session } = useSession();
    const items = useSelector( state => state.cart.items);
    //console.log('Layout', items)
    //const {state, dispatch} = useContext(Store);
    //const { cart } = state;

    /*
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
       setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);
    
    */

    const logoutClickHandler = () => {
        //Cookies.remove('cart');
        //dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    };

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="My Ecommerce Website"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />
            <div className="flex min-h-screen flex-col justify-between">
                <header>
                    <nav className="flex h-12 items-center px-4 justify-between shadow-md">
                        <Link href='/'>
                            <a className="text-lg font-bold">Ecommerce</a>
                        </Link>
                        <div>
                            <Link href="/cart">
                                <a className="p-2">
                                    Cart
                                    {(items) && (
                                        <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                            {items.length}
                                        </span>
                                    )}
                                </a>
                            </Link>
                            
                            {
                                (status === 'authenticated') 
                                ? <p>{session.user.email}</p>
                                : <a href="/api/auth/signin/">Sign in</a>
                            }
                            {
                                (status === 'authenticated') && <a href="/api/auth/signout/">Log out</a>
                            }
                            
                        </div>

                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">
                    {children}
                </main>
                <footer className="flex h-10 justify-center items-center shadow-inner">
                    <p>Copyright ©️ 2022 - Sandro Simón</p>
                </footer>
            </div>
        </>
    )
}