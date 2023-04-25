import React, { useContext } from "react";
import ExpenseContext from "../Store/ExpenseContext";
import { FaUserAlt } from "react-icons/fa";
import { FaRegFlushed } from 'react-icons/fa';

//import Classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  const ctx = useContext(ExpenseContext);

  const onDeleteHandler = () => {
    ctx.DeleteExpense(props.id);
  };

  const onEditHandler = () => {
    props.onEdit();
  };

  return (
    <div>
      <ul>
        <li>
          {<FaUserAlt />}
          {"    "}Name : {props.name}  {<FaRegFlushed />}
          {"    "} Category:{props.category} {<FaRegFlushed />}
          {"    "} Amount:
          {props.amount}
          {<FaRegFlushed />}
          {"    "}
          Discription: {props.discription}
          <button onClick={onEditHandler}>Edit</button>{" "}
          <button onClick={onDeleteHandler}>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default ExpenseList;