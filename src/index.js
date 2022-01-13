import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// 코드 최적화
const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
    id: Date.now(),
  };
};
const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: action.id }]; // Date 바로 쓰는걸 지양하라고 하네용
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== parseInt(action.id)); // html 에서 받아오는 정보는 string 일 확률이 높음
    default:
      return state;
  }
};

const store = createStore(reducer);

// const createTodo = (todo) => {
//   const li = document.createElement("li");
//   li.innerText = todo;
//   ul.appendChild(li);
// };

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};
const dispatchDeleteTodo = (e) => {
  // console.log(e.target.parentNode.id, "text delete");
  const id = e.target.parentNode.id;
  store.dispatch(deleteTodo(id));
};

// store.subscribe(() => console.log(store.getState()));

const paintTodos = () => {
  const todos = store.getState(); // state 에 계속 리스트가 누적되기 때문에
  ul.innerHTML = ""; // 이전에 작성했던 리스트 리페인팅 되는 문제 해결하기 위해 ul 리셋해주기
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "Del";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(paintTodos);

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = ""; // input 창 리셋
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
