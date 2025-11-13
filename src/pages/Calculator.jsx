import { useState, useEffect } from "react"
const Calculator = () => {

  const [screen, setScreen] = useState("0");
  const [state, setState] = useState("S0");
  const [firstOperand, setFirstOperand] = useState(0);
  const [lastOperand, setLastOperand] = useState(0);
  const [lastOperator, setLastOperator] = useState("?");

  const updateOperatorHighlight = (operator) => {
    setLastOperator(operator);
  };

  const numberClicked = (number) => {
    if (state === "S0" && number !== 0) {
      setScreen(number.toString());
      setState("S1");
    } else if (state === "S1") {
      setScreen((prev) =>
        prev.length < 9 ? prev + number.toString() : prev
      );
    } else if (state === "S2") {
      setScreen(number.toString());
      setState("S1");
    }
  };

  const operatorClicked = (op) => {
    if (state === "S1") {
      setFirstOperand(Number(screen));
      setLastOperand(Number(screen));
      updateOperatorHighlight(op);
      setState("S2");
    } else if (state === "S2") {
      updateOperatorHighlight(op);
    }
  };

  const equalClicked = () => {
    let result = 0;

    if (state === "S1") {
      const second = Number(screen);
      setLastOperand(second);

      if (lastOperator === "+") result = firstOperand + second;
      else if (lastOperator === "-") result = firstOperand - second;
      else result = second;

      setScreen(result.toString());
      setFirstOperand(result);
      setState("S2");
    } else if (state === "S2") {
      if (lastOperator === "+") result = firstOperand + lastOperand;
      else if (lastOperator === "-") result = firstOperand - lastOperand;
      else result = Number(screen);

      setScreen(result.toString());
      setFirstOperand(result);
    }
  };

  const ceClicked = () => {
    setScreen("0");
    setState("S0");
    setFirstOperand(0);
    setLastOperand(0);
    setLastOperator("?");
  };

  // รองรับ keyboard
  useEffect(() => {
    const checkKeyboard = (event) => {
      if (event.key >= "0" && event.key <= "9") {
        numberClicked(Number(event.key));
      } else if (event.key === "+") {
        operatorClicked("+");
      } else if (event.key === "-") {
        operatorClicked("-");
      } else if (event.key === "=" || event.key === "Enter") {
        equalClicked();
      } else if (event.key === "Escape") {
        ceClicked();
      }
    };

    document.addEventListener("keydown", checkKeyboard);
    return () => document.removeEventListener("keydown", checkKeyboard);
  });


  return (
    <div className="container text-center my-4">
      <div className="card shadow p-3 bg-secondary-subtle mx-auto" style={{ width: "fit-content" }}>
        <div
          className="border border-secondary rounded p-2 text-end bg-info-subtle fs-3 mb-3 "
          style={{ minWidth: "12rem" }}
        >
          {screen}
        </div>

        {/* แถวที่ 1 */}
        <div className="d-flex justify-content-center mb-2 flex-wrap gap-2 ">
          {["MC", "MR", "M+", "M−"].map((b) => (
            <button key={b} className="btn btn-success button-Cal" disabled>
              {b}
            </button>
          ))}
          <button className="btn btn-danger button-Cal" onClick={ceClicked}>
            CE
          </button>
        </div>

        {/* แถวที่ 2 */}
        <div className="d-flex justify-content-center mb-2 flex-wrap gap-2">
          {[7, 8, 9].map((n) => (
            <button
              key={n}
              className="btn btn-primary button-Cal"
              onClick={() => numberClicked(n)}
            >
              {n}
            </button>
          ))}
          <button className="btn btn-success button-Cal" disabled>
            ÷
          </button>
          <button className="btn btn-success button-Cal" disabled>
            √
          </button>
        </div>

        {/* แถวที่ 3 */}
        <div className="d-flex justify-content-center mb-2 flex-wrap gap-2">
          {[4, 5, 6].map((n) => (
            <button
              key={n}
              className="btn btn-primary button-Cal"
              onClick={() => numberClicked(n)}
            >
              {n}
            </button>
          ))}
          <button className="btn btn-success button-Cal" disabled>
            ×
          </button>
          <button className="btn btn-success button-Cal" disabled>
            %
          </button>
        </div>

        {/* แถวที่ 4 */}
        <div className="d-flex justify-content-center mb-2 flex-wrap gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className="btn btn-primary button-Cal"
              onClick={() => numberClicked(n)}
            >
              {n}
            </button>
          ))}
          <button
            className={`btn button-Cal ${lastOperator === "-" ? "btn-warning" : "btn-success"
              }`}
            onClick={() => operatorClicked("-")}
          >
            −
          </button>
          <button className="btn btn-success button-Cal" disabled>
            1/x
          </button>
        </div>

        {/* แถวที่ 5 */}
        <div className="d-flex justify-content-center flex-wrap gap-2">
          <button className="btn btn-primary button-Cal" onClick={() => numberClicked(0)}>
            0
          </button>
          <button className="btn btn-primary button-Cal" disabled>
            .
          </button>
          <button className="btn btn-primary button-Cal" disabled>
            +/−
          </button>
          <button
            className={`btn button-Cal ${lastOperator === "+" ? "btn-warning" : "btn-success"
              }`}
            onClick={() => operatorClicked("+")}
          >
            +
          </button>
          <button className="btn btn-success button-Cal" onClick={equalClicked}>
            =
          </button>
        </div>
      </div>

      <div className="text-center fw-bold mt-3">
        67090695 นายณชพัฒน์ สัมฤทธิ์ยากรณ์
      </div>
    </div>
  );
}

export default Calculator;