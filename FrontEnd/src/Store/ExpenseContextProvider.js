import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";

import ExpenseContext from "./ExpenseContext";

const ExpenseContextProvider = (props) => {
  const [Expense, SetExpense] = useState([]);
  const [TotalAmount, SetTotalAmunt] = useState(0);

  const TotalAmountCalculator = (data) => {
    let calculatedAmount = 0;
    data.map((data) => {
      return (calculatedAmount += +data.amount);
    });
    SetTotalAmunt(calculatedAmount);
  };

  const getExpenseData = useCallback(async () => {
    await axios
      .get(`http://localhost:5000/api/users`)
      .then((res) => {
        SetExpense(res.data);
        console.log(res.data);
        TotalAmountCalculator(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getExpenseData();
  }, [getExpenseData]);

  const AddExpenseHandler = useCallback(
    async (userDetail) => {
      try {
        await axios
          .post("http://localhost:5000/api/users", { userDetail })

          .then((res) => {
            getExpenseData();
          });
      } catch (err) {
        console.log(err);
      }
    },
    [getExpenseData]
  );

  const DeleteExpenseHandler = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`).then(() => {
          getExpenseData();
        });
      } catch (err) {
        console.log(err);
      }
    },
    [getExpenseData]
  );

  const ExpenseDeafult = {
    ExpenseList: Expense,
    totalAmount: TotalAmount,
    AddExpense: AddExpenseHandler,
    DeleteExpense: DeleteExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={ExpenseDeafult}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
