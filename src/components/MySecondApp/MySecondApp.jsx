import React from "react";
import ReactDOM from "react-dom";
import {curry, compose, tap, props, partial} from "ramda"
import Maybe from "../../monads/Maybe/Maybe";
import IO from "../../monads/IO/IO"
import Either from "../../monads/Either/Either";
import db from "../../fakeDB/fakeDB"

const trim = (str) => str.replace(/^\s*|\s*$/g, '');
const normalize = (str) => str.replace(/-/g, '-');
export const cleanInput = compose(normalize, trim);

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

export const findStudent = safeFindObject(db);

export const csv = arr => arr.join(',');


const debugLog = console.log
const errorLog = console.error

const trace = curry((msg, val) => debugLog(msg + ':' + val));

const container = partial((document, elementId) => document.querySelector(elementId), [document])
// console.log(container('#student-name'));

const append = curry((container, errorLog, elementId, info) => {
    container('#student-name').innerHTML = info.orElse(errorLog);
    return info;
})(container)(errorLog)

const liftIO = val => IO.of(val)

const showMyStudent = compose(
    map(append('#student-name')),
    liftIO,
    map(csv),
    map(props(['ssn', 'firstname', 'lastname'])),
    chain(findStudent),
    lift(cleanInput)
);

export const MySecondApp = () => {
    // console.log("______________________________________TEST________________________________");
// console.log(cleanInput(' 444-44-4444 '));
    showMyStudent('444-44-4444').run()

    return (
        <h1>MySecondApp</h1>
    )
}