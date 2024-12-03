"use client";
import { useState } from "react";

export default function ForexCalculator() {
  // Static data for currency pairs
  const currencyPairData = {
    "EUR/USD": { pipSize: 0.0001, contractSize: 100000 },
    "GBP/USD": { pipSize: 0.0001, contractSize: 100000 },
    "USD/JPY": { pipSize: 0.01, contractSize: 100000 },
    "AUD/USD": { pipSize: 0.0001, contractSize: 100000 },
    "USD/CHF": { pipSize: 0.0001, contractSize: 100000 },
    "NZD/USD": { pipSize: 0.0001, contractSize: 100000 },
    "USD/CAD": { pipSize: 0.0001, contractSize: 100000 },
    "XAU/USD": { pipSize: 0.01, contractSize: 100 },
  };

  // State variables
  const [currencyPair, setCurrencyPair] = useState("EUR/USD");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [tradeType, setTradeType] = useState("buy"); // "buy" or "sell"
  const [openPrice, setOpenPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [lotSize, setLotSize] = useState(1); // Default lot size is 1
  const [results, setResults] = useState({ pips: 0, money: 0 });

  const calculateProfitLoss = () => {
    const { pipSize, contractSize } = currencyPairData[currencyPair];

    const pips =
      tradeType === "buy"
        ? (closePrice - openPrice) / pipSize
        : (openPrice - closePrice) / pipSize;

    const pipValueInMoney =
      (pipSize * lotSize * contractSize) /
      (accountCurrency === "USD" ? 1 : 1); // Assuming USD base
    const money = pips * pipValueInMoney;

    setResults({
      pips: parseFloat(pips.toFixed(2)),
      money: parseFloat(money.toFixed(2)),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-800  w-2/5 mx-auto my-2 max-h-screen p-4 gap-5 rounded-xl shadow-2xl ...">
      <h1 className="text-4xl text-white">Forex Profit Calculator</h1>
<section className="flex flex-col gap-4">
      {/* Currency Pair Dropdown */}
      <div className="flex flex-row gap-10 ">
      <label>
        Currency Pair:
        <select
          value={currencyPair}
          onChange={(e) => setCurrencyPair(e.target.value)}
          className="p-4 rounded-xl"
        >
          {Object.keys(currencyPairData).map((pair) => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </select>
      </label>

      {/* Account Currency Dropdown */}
      <label>
        Account Currency:
        <select
          value={accountCurrency}
          onChange={(e) => setAccountCurrency(e.target.value)}
          className="p-4 rounded-xl"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
      </div>
     <div className="flex flex-row">
      {/* Open Price Input */}
      <label>
        Open Price:
        <input
          type="number"
          value={openPrice}
          onChange={(e) => setOpenPrice(parseFloat(e.target.value))}
          className=" p-2 rounded-xl"
        />
      </label>

      {/* Close Price Input */}
      <label>
        Close Price:
        <input
          type="number"
          value={closePrice}
          onChange={(e) => setClosePrice(parseFloat(e.target.value))}
          className=" p-2 rounded-xl"
        />
      </label>
      </div>
      {/* Lot Size Input */}
      <label className="flex flex-row justify-center items-center">
        Lot Size:
        <input
          type="number"
          value={lotSize}
          onChange={(e) => setLotSize(parseFloat(e.target.value))}
          className=" p-2 rounded-xl"
        />
      </label>
         {/* Trade Type */}
<div className="flex flex-col  justify-center items-center gap-2">
  Trade Type:
<label className="flex flex-row gap-5">
  <button onClick={() => {
      tradeType === 'buy'
      setTradeType('buy')
    }} className="p-4 bg-black text-white rounded-lg w-72 border-2 border-gray-100 bg-green-950">
    BUY
    </button>
    <button onClick={() => {
      tradeType === 'sell'
      setTradeType('sell')
    }} className="p-4 bg-black text-white rounded-lg w-72 border-2 border-gray-100 bg-red-950">
    SELL
    </button>
</label>
</div>
      {/* Calculate Button */}
      <button onClick={calculateProfitLoss}
      className="p-4 bg-blue-950 border-2 border-black rounded-xl"
      >
        Calculate
      </button>

      {/* Results */}
      <div className="">
        <h2 className="text-4xl border-b-2 border-cyan-950 mt-4">Results:</h2>
        <div className="flex flex-row items-center justify-between mt-2">
        <p className="text-2xl flex flex-row items-center">Pips: <span className="text-4xl">{results.pips}</span> </p>
        <p className="text-2xl flex flex-row items-center">
           Money:{results.money > 0 ? (
  <span className="text-4xl text-green-950">{results.money} {accountCurrency}</span>
) : (
  <span className="text-4xl text-red-950">{results.money} {accountCurrency}</span>
)}
        </p>
        </div>
      </div>
      </section>
    </div>
  );
}
