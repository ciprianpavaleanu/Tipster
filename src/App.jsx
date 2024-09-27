import { useState } from "react";

export default function App() {
  const [billPrice, setBillPrice] = useState("");
  const [userTip, setUserTip] = useState("");
  const [friendTip, setFriendTip] = useState("");

  function resetBill() {
    setBillPrice("");
    setUserTip(0);
    setFriendTip(0);
  }

  const finalTip = billPrice * ((userTip + friendTip) / 2 / 100);
  return (
    <div className="app">
      <Header />
      <BillInput billPrice={billPrice} onSetBillPrice={setBillPrice} />
      <ServiceReview tip={userTip} onSetTip={setUserTip}>
        How did you like the service?
      </ServiceReview>
      <ServiceReview tip={friendTip} onSetTip={setFriendTip}>
        How did your friend like the service?
      </ServiceReview>
      {billPrice > 0 && (
        <TipCalculator billPrice={billPrice} finalTip={finalTip} />
      )}
      <Reset onReset={resetBill} />
    </div>
  );
}

function Header() {
  return <h1>Tipster</h1>;
}

function BillInput({ billPrice, onSetBillPrice }) {
  return (
    <div className="entryarea">
      <input
        type="text"
        value={billPrice}
        onChange={(e) => onSetBillPrice(Number(e.target.value))}
      ></input>
      <div className="labelline">
        <label>How much was the bill?</label>
      </div>
    </div>
  );
}

function ServiceReview({ children, tip, onSetTip }) {
  return (
    <div className="entryarea">
      <select value={tip} onChange={(e) => onSetTip(Number(e.target.value))}>
        <option value="0">Dissatisfaied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely Amazing! (20%)</option>
      </select>
      <div className="labelline">
        <label>{children}</label>
      </div>
    </div>
  );
}

function TipCalculator({ billPrice, finalTip }) {
  return (
    <h2 className="output">
      You pay {billPrice + finalTip}$ ( {billPrice}$ + {finalTip}$ )
    </h2>
  );
}

function Reset({ onReset }) {
  return (
    <button className="button" onClick={onReset}>
      Reset
    </button>
  );
}
