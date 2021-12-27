import React from "react";
import {curry} from "ramda"
import db from "../../fakeDB/fakeDB"
import Either from "../../monads/Either/Either";
import timer from "../../utilities/timer/timer"

let counter = 0

const safeFindObject = curry(function (db, ssn) {
    counter++
    return Either.fromNullable(db.get(ssn));
});
const findStudent = safeFindObject(db).memoize()

console.log(timer(findStudent, '444-44-4444').run());
console.log(timer(findStudent, '444-44-4444').run());
console.log(timer(findStudent, '444-44-4444').run());
console.log(timer(findStudent, '444-44-4444').run());

console.log("counter = ", counter)


export const Memoize = () => {
    return (
        <h3>Memoize</h3>
    )
}