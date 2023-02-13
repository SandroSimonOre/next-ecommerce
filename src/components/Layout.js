import { signOut, useSession } from 'next-auth/react';
import { BsCart3 } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

export const Layout = ({title, children}) => {

    const { status, data: session } = useSession();
    const items = useSelector( state => state.cart.items);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content="Bookstore" key="title" />
                <meta name='type' property='og:type' content='website' />
                <meta name='image' property='og:image' content='https://bookstore.sandrosimon.com/images/preview.png' />
                <meta name='url' property='og:url' content='https://bookstore.sandrosimon.com' />
                <meta name="description" property='og:description' content="Buy your favorite book and pay for it with Paypal." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />
            <div className="flex min-h-screen flex-col justify-between">
                <header>
                    <nav className="flex h-16 items-center px-4 justify-between shadow-md">
                        <Link href='/'>
                            <a className="text-lg font-bold">Ecommerce</a>
                        </Link>
                        <div className='flex space-x-6 items-center'>
                            
                            <Link href="/cart">
                            
                                <a className="flex justify-center p-2 relative">
                                    
                                    <BsCart3 className='text-3xl' />
                                    {(items.length > 0) && (
                                        <span className="absolute top-0 right-0 ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                            {items.length}
                                        </span>
                                    )}
                                </a>
                            
                            </Link>
                            
                            {
                                (status === 'authenticated') 
                                ? <p className='hidden md:inline-flex'>{session.user.email}</p>
                                : <><Link href="/login">Sign in</Link><Link href="/signup">Sign up</Link></>
                            }
                            {
                                (status === 'authenticated') && <a href="#" onClick={()=> signOut()}>Logout</a>
                            }
                            
                        </div>

                    </nav>
                </header>

                <main className="container m-auto my-4 px-4">
                    {children}
                </main>
                
                <footer className="p-8 flex justify-center items-center shadow-inner bg-black text-white">
                    <p>Copyright ©️ 2023 - Sandro Simón</p>
                </footer>
            </div>
        </>
    )
}