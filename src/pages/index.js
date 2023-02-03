import { Layout } from '../components/Layout';
import { BookCard } from '../components/BookCard';
import { useSelector, useDispatch } from 'react-redux';
import { BooksContext } from '../context/BooksContext';
import { useContext } from 'react';

export default function Home() {
  //const items = useSelector( state => state.cart.items);
  const {books} = useContext(BooksContext)
  //console.log(books)

  const categories = ["Self-help", "Development", "Science", "History", "Romance", "Economy", "Poetry"]
   
  return (
     <Layout title='My Ecommerce'>       
      <div className='flex lg:gap-2'>
        {
          categories.map((c, i) => (
            <span key={i} className= 'bg-slate-100'>{c}</span>
          ))
        }
        
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
        {
          books.map( book => <BookCard key={book._id} book = {book} /> )
        }
      </div>
    </Layout>
  )
}
