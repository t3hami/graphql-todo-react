import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getTodosQuery,
  addTodoMutation,
  deleteTodoMutation,
  editIdDoneTodoMutation,
  editDescriptionTodoMutation
} from '../queries/queries';
import {
  List,
  Grid,
  TextField,
  Button,
  Paper,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Tooltip
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Edit from "@material-ui/icons/Edit";

class TodoList extends Component {
  state = {
    todoDescription: '',
    editing: false
  }

  render() {
    return (
      <div>
        <Paper style={{ margin: 16, padding: 16 }}>
          <Grid container>
            <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
              <TextField
                value={this.state.todoDescription}
                placeholder="Add Todo here"
                onChange={e => this.setState({ todoDescription: e.target.value })}
                onKeyPress={e => {(e.charCode === 13) && this.addTodo()}}
                fullWidth
              />
            </Grid>
            <Grid xs={2} md={1} item>
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={this.addTodo.bind(this)}
              >
                {this.state.editing ? "Update" : "Add"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            {this.getTodos()}
          </List>
        </Paper>
        <Paper style={{ margin: 16, padding: 16 }}>
          <Typography color="inherit" variant="h5">
            { !this.props.getTodosQuery.loading ?
              this.props.getTodosQuery.hello: "Loading..."}
          </Typography>
        </Paper>
      </div>
    );
  }

  addTodo = async () => {
    if (this.state.editing) {
      await this.props.editDescriptionTodoMutation({
        variables: {
          id: this.state.editId,
          description: this.state.todoDescription
        }
      });
      this.setState({
        editing: false,
        editId: ""
      })
    }
    else {
      this.props.addTodoMutation({
        variables: {
          description: this.state.todoDescription
        }
      });
      console.log('add');
    }
    await this.props.getTodosQuery.refetch();
    this.setState({ todoDescription: '' });
  }

  getTodos() {
    let data = this.props.getTodosQuery;
    if (data.loading) return 'Loading...';
    if (data.error) return 'Error!';
    return (data.todos.map(({ id, description, isDone }) => (
      <ListItem divider={true} key={id}>
        <Tooltip title={isDone ? "Make Undone" : "Mark Done"}>
          <Checkbox
            disableRipple
            checked={isDone}
            color="primary"
            onChange={(e) => { this.editIsDoneTodo(e, id) }}
          />
        </Tooltip>
        <ListItemText primary={description} style={{textDecoration : isDone ? "line-through" : "none"}} />
        <ListItemSecondaryAction>
          <Tooltip title="Edit Todo">
          <IconButton aria-label="Edit Todo" onClick={() => { this.editInTextBox(id, description) }}>
            <Edit />
          </IconButton>
          </Tooltip>
          <Tooltip
            title="Delete Todo">
          <IconButton aria-label="Delete Todo" onClick={() => { this.deleteTodo(id) }}>
            <DeleteOutlined style={{color: "#CC0000"}} />
          </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    ))
    )
  }

  async deleteTodo(id) {
    await this.props.deleteTodoMutation({
      variables: {
        id: id
      }
    });
    await this.props.getTodosQuery.refetch();
  }

  async editIsDoneTodo(e, id) {
    await this.props.editIdDoneTodoMutation({
      variables: {
        id: id,
        isDone: e.target.checked
      }
    });
    await this.props.getTodosQuery.refetch();
    console.log('done');
  }

  editInTextBox(id, description) {
    this.setState({
      todoDescription: description,
      editId: id,
      editing: true
    });
  }

}

export default compose(
  graphql(getTodosQuery, { name: "getTodosQuery" }),
  graphql(addTodoMutation, { name: "addTodoMutation" }),
  graphql(deleteTodoMutation, { name: "deleteTodoMutation" }),
  graphql(editIdDoneTodoMutation, { name: "editIdDoneTodoMutation" }),
  graphql(editDescriptionTodoMutation, { name: "editDescriptionTodoMutation" })
)(TodoList);