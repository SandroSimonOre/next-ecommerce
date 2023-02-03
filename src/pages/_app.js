import '../styles/globals.css'
//import { StoreProvider } from '../utils/Store'
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { BooksProvider } from '../context/BooksContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <BooksProvider>
        <Provider store={store}>  
          <Component {...pageProps} />
        </Provider>
      </BooksProvider>
    </SessionProvider>
  )
}

export default MyApp
