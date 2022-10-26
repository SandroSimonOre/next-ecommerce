
import { Layout } from '../components/Layout';
import { ProductItem } from '../components/ProductItem';
import data from '../utils/data.json';
//import styles from '../styles/Home.module.scss'

export default function Home() {
  //console.log(data.products)
  return (
    <Layout title='My Ecommerce'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {data.products.map( product => (
        <ProductItem product={product} />
      ))}
      </div>
    </Layout>
  )
}
