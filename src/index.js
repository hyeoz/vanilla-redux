import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// Second Improvement
// string 을 직접 사용하면 오타 발생시 자바스크립트에서 에러를 띄우지 못함
const ADD = "add";
const MINUS = "minus";

const counterModifier = (count = 0, action) => {
  // console.log(count, action);
  // return state;

  // if (action.type === "add") {
  //   // console.log("action type is add");
  //   return count + 1;
  // } else if (action.type === "minus") {
  //   return count - 1;
  // }
  // return count;

  // Frist Improvement
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(counterModifier);

// countStore.dispatch({ type: "add" });
// console.log(countStore.getState());

const onChange = () => {
  // console.log("there was a change on the store");
  // console.log(countStore.getState());
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));

// 바닐라 JS
// let count = 0;

// number.innerText = count;

// const updateText = () => {
//   number.innerText = count;
// };

// const handleAdd = () => {
//   count++;
//   updateText();
// };
// const handleMinus = () => {
//   count--;
//   updateText();
// };

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);
