import { Layout } from '../components/Layout';
import { ProductItem } from '../components/ProductItem';
import data from '../utils/data.json';
import { useSelector, useDispatch } from 'react-redux';


export default function Home() {
  const items = useSelector( state => state.cart.items);
  
  return (
    <Layout title='My Ecommerce'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {data.products.map( product => {
          let item = items.find( e => e.id === product.id);
          if (item) product.quantity = item.quantity;
          return <ProductItem product={product} key={product.id} />
        })}
      </div>
    </Layout>
  )
}
