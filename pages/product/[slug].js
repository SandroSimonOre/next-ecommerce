import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Layout } from "../../components/Layout";
import data from "../../utils/data.json";
import { Store } from "../../utils/Store";

export default function ProductPage() {
    
    const {state, dispatch} = useContext(Store);

    const {query} = useRouter();
    const {slug} = query;
    const product = data.products.find( x => x.slug === slug);
    
    if (!product) {
        return <div>Product Not Found</div>;
    }

    const addToCartHandler = () => {
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
    }

    return (
        <Layout title={product.title}>
            <div className="py-2">
                <Link href='/'>Back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image 
                        src={product.thumbnail}
                        alt={product.title}
                        width={640}
                        height={640}
                        Layout="responsive"
                    ></Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.title}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>Rating: {product.rating}</li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.stock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>

                        <button className="primary-button w-full" onClick={addToCartHandler}>Add to Cart</button>

                    </div>
                </div>
                
            </div>
        </Layout>
    )
    
}