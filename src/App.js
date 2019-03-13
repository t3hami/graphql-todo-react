import React, { Component, memo } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TodoList from './components/TodoList';
import Layout from './components/Layout';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

class App extends Component {
  render() {
    return (
      <Layout>
        <ApolloProvider client={client}>
          <TodoList />
        </ApolloProvider>
      </Layout>
    );
  }
}

export default memo(App);
