import $ from "jquery";
import moment from "moment";
import React, { useState, useEffect } from "react";
import "../style.css";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [transactionReport, setTransactionReport] = useState([]);

  useEffect(() => {
    setBalance(0);
    $("#expense").val();
    $("#transaction_report").empty();
  }, []);

  function calculateBalance(payload) {
    let amount = Number($("#expense").val());
    let performCalc = {
      Add: () => balance + amount,
      Remove: () => balance - amount,
      multiply: () => balance * amount,
      division: () => balance / amount,
    };
    setBalance(performCalc[payload.operation]);
    // payload.operation === "Add" ? balance + amount : balance - amount

    if (amount > 0) {
      let date = moment().format();
      setTransactionReport([
        ...transactionReport,
        `${date} - ${amount} - ${payload.operation}`,
      ]);
    }
    $("#expense").val("");
  }

  return (
    <React.Fragment>
      <section className="tracker-layout container">
        <div className="mt-3">
          <h3>Expense Tracker - Basic</h3>
        </div>
        <div>
          Balance : <span id="total_expense">{balance}</span>
        </div>
        <div>
          <input
            id="expense"
            className="expense-inp mt-3"
            type="number"
            min="0"
          />
        </div>
        <div className="my-4">
          <button
            className="btn btn-primary"
            onClick={() => calculateBalance({ operation: "Add" })}
          >
            Add
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => calculateBalance({ operation: "Remove" })}
          >
            Remove
          </button>
        </div>
      </section>
      <section className="tracker-layout container trasaction-sec">
        <b>Transaction </b>
        <div className="mt-3" id="transaction_report">
          {transactionReport.map((element) => {
            return <p>{element}</p>;
          })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default App;
