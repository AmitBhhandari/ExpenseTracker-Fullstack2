import React, { Fragment, useContext, useRef } from "react";
import ExpenseList from "./ExpenseList";


 
import ExpenseContext from "../Store/ExpenseContext";
import Classes from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const ctx = useContext(ExpenseContext);
  const TotalAmount = ctx.totalAmount;

  function oneditHandler(data) {
    NameRef.current.value = data.name;
    AmountRef.current.value = data.amount;
    DiscriptionRef.current.value = data.discription;

    ctx.DeleteExpense(data.id);
  }

  const ExpenseAfterOperation = ctx.ExpenseList.map((Expense) => {
    return (
      <ExpenseList
        key={Expense.id}
        id={Expense.id}
        name={Expense.name}
        category={Expense.category}
        amount={Expense.amount}
        discription={Expense.discription}
        onEdit={oneditHandler.bind(this, Expense)}
      />
    );
  });

  const NameRef = useRef();
  const CategoryRef = useRef();
  const AmountRef = useRef();
  const DiscriptionRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const UserInfo = {
      name: NameRef.current.value,
      category: CategoryRef.current.value,
      amount: AmountRef.current.value,
      discription: DiscriptionRef.current.value,
    };
    ctx.AddExpense(UserInfo);

    NameRef.current.value = " ";
    AmountRef.current.value = " ";
    DiscriptionRef.current.value = " ";
  };

  return (
    <Fragment>
      <h1>Expense Tracker</h1>
      <div className={Classes.form}>
        <form className={Classes.actualclass} onSubmit={onSubmitHandler}>
          <label>Enter Your Name: </label>
          <input
            className={Classes.inputtext}
            ref={NameRef}
            type="text"
            name="name"
            id="name"
            required
          />
          <label> Select Category: </label>
          <select name="category" ref={CategoryRef}>
            <option value="Books">Books</option>
            <option value="Books">Petrol</option>
            <option value="Books">Electricity Bill</option>
            <option value="Books">Shopping</option>
            <option value="Books">Others</option>
          </select>
          <label>Enter Amount :</label>
          <input
            type="number"
            name="amount"
            id="amount"
            ref={AmountRef}
            required
          ></input>
          <label>Enter Your Discription</label>
          <input
            className={Classes.inputtext}
            type="text"
            name="discription"
            id="discription"
            ref={DiscriptionRef}
          ></input>
          <input className={Classes.button} type="submit" />
        </form>
      </div>
      <h2>The List Of Expenses</h2>
      {ExpenseAfterOperation}
      <div className={Classes.totalAmount}>Total Amount = {TotalAmount}</div>
    </Fragment>
  );
};

export default ExpenseForm;
