import IO from "../../monads/IO/IO";
import {tap} from "ramda";

const start = () => performance.now();

const end = function (start) {
    let end = performance.now();
    return (end - start).toFixed(3) + " ms."
};

const test = function (fn, ...input) {
    return () => fn(...input);
};

function timer(fn, ...args) {
    return IO.from(start)
        .map(tap(test(fn, ...args)))
        .map(end);
}

export default timer