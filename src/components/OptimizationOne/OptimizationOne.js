import React from "react";
import {product, range, memoizeWith, identity, tap} from "ramda"
import IO from "../../monads/IO/IO"

let counter = 0

const calculate = n => { // tested function
    counter++
    return product(range(1, n + 1))
}

const maskify = (cc) => // second tested function
    cc.slice(0, -4).replace(/./g, '#') + cc.slice(-4);


const start = () => performance.now();

const end = function (start) {
    let end = performance.now();
    return (end - start).toFixed(3) + " ms."
};

const test = function (fn, input) {
    return () => fn(input);
};

const testCalculate = IO.from(start)
    .map(tap(test(calculate, 99)))
    .map(end);


// console.log();
console.log(testCalculate.run()); // -> time ms
console.log(testCalculate.run()); // -> time ms for second invoke
console.log(testCalculate.run());
// console.log(testCalculate.run());

// console.log(calculate(99));
// console.log("counter = ", counter);

export const OptimizationOne = () => {
    return (
        <p>optimization one</p>
    )
}