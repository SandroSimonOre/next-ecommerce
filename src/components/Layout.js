import { signOut, useSession } from 'next-auth/react';
import { BsCart3 } from 'react-icons/bs';
import Image from 'next/image';
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
                <meta name="description" content="My Ecommerce Website"/>
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
                                    {/* <Image 
                                        src={"/cart.png"}
                                        height={32}
                                        width={32}
                                        alt='Cart'
                                    /> */}
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
                                ? <p>{session.user.email}</p>
                                : <><a href="/login">Sign in</a><a href="/signup">Sign up</a></>
                            }
                            {
                                (status === 'authenticated') && <a href="#" onClick={()=> signOut()}>Logout</a>
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