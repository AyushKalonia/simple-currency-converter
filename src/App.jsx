import React, { useState } from "react"
import { InputBox } from "./components/index"
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import bgImage from "./assets/bg.jpg";

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from) // custom hook call
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* card */}
      <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30">
        <h1 className="text-3xl font-bold text-white text-center mb-10">
          Currency Converter
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-2"
        >
          {/* FROM */}
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={(amount) => setAmount(amount)}
            currencyOptions={options}
            onCurrencyChange={(curr) => setFrom(curr)}
            selectCurrency={from}
            
          />

          {/* SWAP */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium
                         hover:bg-blue-700 active:scale-95 transition"
            >
              ↕ Swap
            </button>
          </div>

          {/* TO */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(curr) => setTo(curr)}
            selectCurrency={to}
            amountDisable={true}
          />

          {/* CONVERT */}
          <button
            type="submit"
            className="w-full py-3 mt-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold tracking-wide
                       hover:from-blue-700 hover:to-indigo-700
                       active:scale-[0.98] transition-all"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}


export default App
