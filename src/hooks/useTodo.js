import { useCallback } from "react";
import { useReducer } from "react";

function todosReducer(state, action) {
  if(action.type === "REMOVE_TODO") {
    return {
      ...state,
      todos: state.todos.filter(todo => todo.name !== action.payload.name)
    };
  }
  if(action.type === "TOGGLE_TODO") {
    return {
      ...state,
      todos: state.todos.map(todo => 
        todo.name === action.payload.name ? {...todo, checked: !todo.checked} : todo
      )
    };
  }
  if(action.type === "CLEAR_COMPLETED") {
    return {
      ...state,
      todos: state.todos.filter(todo => !todo.checked)
    };
  }
  console.log("reducer", state, action);
  return state;
}

export function useTodos() {
  const [state, dispatch] = useReducer(todosReducer, {
    showCompleted: true,
    todos: [
      { name: 'faire les courses', checked: false },
      { name: 'faire la vaisselle', checked: false },
      { name: 'faire le ménage', checked: false }
    ]
  });
  const visibleTodos = state.showCompleted ? state.todos : state.todos.filter(todo => !todo.checked);
  return {
    visibleTodos: visibleTodos,
    toggleTodo: useCallback((todo) => dispatch({ type: "TOGGLE_TODO", payload: todo }), []),
    removeTodo: useCallback((todo) => dispatch({ type: "REMOVE_TODO", payload: todo }), []),
    clearCompleted: useCallback(() => dispatch({ type: "CLEAR_COMPLETED" }), []),
  }
}

