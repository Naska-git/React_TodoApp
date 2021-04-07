import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./compornents/InputTodo";
import { IncompleteTodos } from "./compornents/IncompleteTodos";
import { CompleteTodos } from "./compornents/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  //未完了のタスクincompleteTodosを更新するためのsetIncompleteTodos
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [compleateTodos, setCompleateTodos] = useState([]);

  //テキストエリアに入力された時にtodoTextの値を更新する処理
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //追加ボタンを押した時の処理
  const onClickAdd = () => {
    if (todoText === "") return;
    //...incompleteTodosに現在存在する配列の中身全て
    //その後に入力した値todoTextを追加
    const newTodos = [...incompleteTodos, todoText];
    //setIncompleteTodosにnewTodosの中身を入れる
    setIncompleteTodos(newTodos);
    //追加後にテキストエリアを空にする
    setTodoText("");
  };

  //削除ボタンを押した時の処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //splice(削除したい場所, 削除する個数)
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了ボタンを押した時の処理
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    //[完了済みタスク一覧, 完了ボタン押した行のタスク]
    const newCompleteTodos = [...compleateTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleateTodos(newCompleteTodos);
  };

  //戻すボタンを押した時の処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...compleateTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, compleateTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleateTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={compleateTodos} onClickBack={onClickBack} />
    </>
  );
};
