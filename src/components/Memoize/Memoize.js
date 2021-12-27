import React from "react";
import {curry} from "ramda"
import db from "../../fakeDB/fakeDB"
import Either from "../../monads/Either/Either";

const safeFindObject = curry(function (db, ssn) {
    return Either.fromNullable(db.get(ssn));
});
const findStudent = safeFindObject(db).memoize();
console.log(findStudent('444-44-4444').orElse(console.error));

// console.log(findStudent('444-44-4444').orElse(console.error));
// console.log(findStudent('444-44-4444').orElse(console.error));


export const Memoize = () => {
    return (
        <h3>Memoize</h3>
    )
}