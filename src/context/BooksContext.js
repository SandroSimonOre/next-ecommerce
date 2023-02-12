import React, { useState, useEffect, createContext } from "react"

export const BooksContext = createContext()

export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([])

    useEffect(()=> {
        
        fetch('/api/books').then(response => response.json()).then(data => setBooks(data))
        console.log('useEffect in BookContext...')
    }, [])

    return (
        <BooksContext.Provider
            value={{books}}
        >
            {children}
        </BooksContext.Provider>
    )
}