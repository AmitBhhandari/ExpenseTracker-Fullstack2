import React from "react";

const ExpenseContext=React.createContext({
  ExpenseList:[],
  totalAmount: 0,
  AddExpense: () => {},
  DeleteExpens: () => {},
});

export default ExpenseContext;