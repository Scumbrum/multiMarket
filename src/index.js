import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {InMemoryCache, from, HttpLink, ApolloProvider, ApolloClient} from "@apollo/client"
import {onError} from "@apollo/client/link/error"
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';
import { ERROR_HENDLER, SERVER } from './config';

const store = configureStore({reducer: rootReducer})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    onError(ERROR_HENDLER),
    new HttpLink({uri:SERVER})
  ])
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
