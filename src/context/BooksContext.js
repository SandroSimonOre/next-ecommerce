import React, { useState, useEffect, createContext } from "react"
import axios from "axios"

export const BooksContext = createContext()

export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([])

    useEffect(()=> {
        
        async function fetchData(){
            const res = await axios.get('/api/books') 
            //console.log("Data:",data.data)
            setBooks(res.data)
        }
        
        fetchData()
        
    }, [])

    return (
        <BooksContext.Provider
            value={{books}}
        >
            {children}
        </BooksContext.Provider>
    )
}