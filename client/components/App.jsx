import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './BookList.jsx';




const client = new ApolloClient({ uri: 'http://localhost:5000/graphql' });


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <h1 className="text-center m-3">Books</h1>
          <BookList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
