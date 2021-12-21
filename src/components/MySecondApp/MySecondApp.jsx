import React from "react";
import {curry, compose, tap, props} from "ramda"
import Maybe from "../../monads/Maybe/Maybe";
import IO from "../../monads/IO/IO"
import Either from "../../monads/Either/Either";
import db from "../../fakeDB/fakeDB"

const map = curry((f, container) => {
    return container.map(f);
});
const chain = curry((f, container) => {
    return container.chain(f);
});
const lift = curry((f, value) => {
    return Maybe.fromNullable(value).map(f);
});


const safeFindObject = curry((db, id) => {
    const val = db.get(id)
    return val ? Either.right(val) : Either.left('Object not found with id: ' + id)
});

const findStudent = safeFindObject(db);

const csv = arr => arr.join(',');


const debugLog = console.log
const errorLog = console.error


const trim = (str) => str.replace(/^\s*|\s*$/g, '');
const normalize = (str) => str.replace(/-/g, '-');
export const cleanInput = compose(normalize, trim);

const trace = curry((msg, val) => debugLog(msg + ':' + val));

const append = curry((elementId, info) => {
    document.querySelector(elementId).innerHTML = info.orElse(errorLog);
    return info;
});

const liftIO = val => IO.of(val)

const showMyStudent = compose(
    map(append('#student-name')),
    tap(trace('Data before append = ')),
    liftIO,
    map(csv),
    map(props(['ssn', 'firstname', 'lastname'])),
    tap(trace('Record fetched successfully!')),
    chain(findStudent),
    tap(trace('Input was valid')),
    lift(cleanInput)
);

showMyStudent('444-44-4444').run()
console.log("______________________________________TEST________________________________");
// console.log(cleanInput(' 444-44-4444 '));

export const MySecondApp = () => {
    return (
        <h1>MySecondApp</h1>
    )
}