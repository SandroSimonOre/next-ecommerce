import { Layout } from '../components/Layout';
import { BookCard } from '../components/BookCard';
import { BooksContext } from '../context/BooksContext';
import { useContext } from 'react';

export default function Home() {
  const {books} = useContext(BooksContext)
  
  // const categories = ["Self-help", "Development", "Science", "History", "Romance", "Economy", "Poetry"]
   
  return (
     <Layout title='My Ecommerce'>       
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-6 md:gap-0'>
        {
          books.map( book => <BookCard key={book._id} book={book} /> )
        }
      </div>
    </Layout>
  )
}