import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      id="container"
      className="font-space_mono bg-light_grayish_cyan h-screen w-screen flex items-center flex-col"
    >
      <div id="header" className="text-xl text-dark_cyan mt-24">
        <h1>GDG - Google Developer Groups</h1>
      </div>

      <div
        id="tip_group"
        className="bg-white w-full max-w-4xl mt-14 shadow-lg rounded-xl shadow-light_grayish_cyan p-8 grid grid-cols-2 gap-10"
      >
        <div id="left_side">
          <div id="bill">
            <label htmlFor="bill" className="text-dark_cyan">
              Bill
            </label>
            <div id="bill_input" className="mt-2">
              <input
                type="text"
                name="bill"
                id="bill"
                className=" bg-very_light_grayish_cyan rounded w-full text-dark_cyan font-semibold py-2 text-lg text-end pr-5 outline-dark_cyan"
                value="142.55"
              />
            </div>
          </div>

          <div id="tip_options" className="mt-8">
            <h3 className="text-dark_cyan">Select Tip %</h3>
            <div id="options" className="grid grid-cols-3 gap-5 mt-3">
              <div
                id="5%"
                className="bg-dark_cyan py-2 rounded-lg text-center text-lg text-white"
              >
                5%
              </div>
              <div
                id="10%"
                className="bg-dark_cyan py-2 rounded-lg text-center text-lg text-white"
              >
                10%
              </div>
              <div
                id="15%"
                className="bg-dark_cyan py-2 rounded-lg text-center text-lg text-white"
              >
                15%
              </div>
              <div
                id="25%"
                className="bg-dark_cyan py-2 rounded-lg text-center text-lg text-white"
              >
                25%
              </div>
              <div
                id="50%"
                className="bg-dark_cyan py-2 rounded-lg text-center text-lg text-white"
              >
                50%
              </div>
              <div
                id="custom"
                className="bg-dark_cyan py-2 rounded-lg text-center text-lg text-white"
              >
                Custom
              </div>
            </div>
          </div>

          <div id="number_of_people" className="mt-8">
            <label htmlFor="number_of_people" className="text-dark_cyan">
              Number of people
            </label>
            <div id="bill_input" className="mt-2">
              <input
                type="text"
                name="bill"
                id="bill"
                className=" bg-very_light_grayish_cyan rounded w-full text-dark_cyan font-semibold py-2 text-lg text-end pr-5 outline-dark_cyan"
                value="142.55"
              />
            </div>
          </div>
        </div>

        <div
          id="right_side"
          className=" bg-dark_cyan rounded-2xl p-5 flex flex-col justify-between"
        >
          <div id="result" className="flex p-2 flex-col items-between">
            <div
              id="amount"
              className="w-full flex justify-between items-center"
            >
              <div className="py-4">
                <span className="text-white">Tip Amount</span> <br />
                <span className="text-grayish_cyan">/ person</span>
              </div>
              <span className="text-4xl font-bold text-strong_cyan flex items-center">
                <img
                  src="/images/icon-dollar.svg"
                  alt=""
                  className="mr-2 w-5 text-strong_cyan"
                />
                4.27
              </span>
            </div>

            <div
              id="total"
              className="w-full flex justify-between items-center"
            >
              <div className="py-4">
                <span className="text-white">Tip Amount</span> <br />
                <span className="text-grayish_cyan">/ person</span>
              </div>
              <span className="text-4xl font-bold text-strong_cyan flex items-center">
                <img
                  src="/images/icon-dollar.svg"
                  alt=""
                  className="mr-2 w-5 text-strong_cyan"
                />
                32.79
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center items-center mb-3">
            <button className="w-full bg-strong_cyan py-3 max-w-xs rounded-lg font-bold tracking-wider">
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
