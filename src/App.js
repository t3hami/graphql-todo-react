import React, { Component, memo } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TodoList from './components/TodoList';
import Layout from './components/Layout';

const client = new ApolloClient({
  uri: "https://graphql-todo-app.herokuapp.com/graphql"
  // uri: "http://localhost:8001/graphql"
});

class App extends Component {
  componentDidMount(){
    document.title = "Apollo GraphQL - TODO"
  }

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
