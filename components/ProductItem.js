import Link from "next/link";
import React from "react";

export const ProductItem = ({product}) => {

    return (
        <div className="card">

            <Link href={`/product/${product.slug}`}>
                <a>
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="rounded shadow" 
                    />
                </a>
            
            </Link>

            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className="text-lg">{product.title}</h2>
                    </a>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p>${product.price}</p>

                <button type="button" className="primary-button">
                    Add to Cart
                </button>

            </div>          
        </div>
    )
}