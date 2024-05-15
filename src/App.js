import React, { useReducer, useRef, useEffect } from "react";
import "./styles.css";

// Initial state
const initialState = [];

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { text: action.payload, hidden: false }];
    case "TOGGLE_TASK":
      return state.map((task, index) =>
        index === action.index ? { ...task, hidden: !task.hidden } : task
      );
    default:
      return state;
  }
};

function App() {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const task = inputRef.current.value.trim();
    if (task) {
      dispatch({ type: "ADD_TASK", payload: task });
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const toggleTask = (index) => {
    tasks[index].hidden ? "Get back writing" : "Content will be hidden";
    dispatch({ type: "TOGGLE_TASK", index });
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <h1>Daily Tasks</h1>
      <form onSubmit={addTask}>
        <input ref={inputRef} placeholder="Enter task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="lists">
            {task.hidden ? "The content is hidden" : task.text}
            <button onClick={() => toggleTask(index)} className="btn">
              {task.hidden ? "Get back writing" : "Toggle"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
