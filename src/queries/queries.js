import { gql } from 'apollo-boost';

const getTodosQuery = gql`
    {
        hello,
        todos {
            id, description, isDone
        }
    }
`

const addTodoMutation = gql`
    mutation($description: String!) {
        createTodo(description: $description) {
            id, description, isDone
        }
    }
`
const deleteTodoMutation = gql`
    mutation($id: String!) {
        deleteTodo (id: $id)
    }
`

const editIdDoneTodoMutation = gql`
    mutation($id: String!, $isDone: Boolean) {
        editTodo (id: $id, isDone: $isDone)
    }
`

const editDescriptionTodoMutation = gql`
    mutation($id: String!, $description: String) {
        editTodo (id: $id, description: $description)
    }
`

export {
    getTodosQuery,
    addTodoMutation,
    deleteTodoMutation,
    editIdDoneTodoMutation,
    editDescriptionTodoMutation
};