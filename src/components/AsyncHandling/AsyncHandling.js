import React from "react";
import getJSON from "../../services/getJSON/getJSON";
import {
    filter,
    sortBy,
    prop,
    map,
    tap,
    pluck,
    head,
    divide,
    sum,
    length,
    compose,
    mergeRight,
    curry,
    props,
    join,
    split
} from "ramda"
import IO from "../../monads/IO/IO"

const fork = (join, f1, f2) => val => join(f1(val), f2(val))
const trace = curry((msg, val) => console.log(msg + ':' + val));

const append = curry((elementId, info) => {
    document.querySelector(elementId).innerHTML = info;
    return info;
});

// const result = getJSON('https://61cad4fd194ffe0017788980.mockapi.io/students')
//     .then(json => json)
//     .then(filter(s => s.address.country === 'US'))
//     .then(sortBy(prop('ssn')))
//     .then(tap(data => console.log(data)))
//     .then(map(student => {
//         return getJSON(`https://61cad4fd194ffe0017788980.mockapi.io/students/${student.id}/grades`)
//             .then(pluck('grades'))
//             .then(head)
//             .then(compose(Math.ceil, fork(divide, sum, length)))
//             .then(grade => {
//                 return IO.of(mergeRight(student, {grade: grade}))
//                     .map(props(["name", "ssn", "grade"]))
//                     .map(join(","))
//                     .map(console.log).run()
//             })
//             .catch(e => console.error(e))
//     }))
//     .catch(e => console.error(e))

const average = compose(Math.ceil, fork(divide, sum, length))

const result2 = getJSON('https://61cad4fd194ffe0017788980.mockapi.io/students')
    .then(map(student => `https://61cad4fd194ffe0017788980.mockapi.io/students/${student.id}/grades`))
    .then(gradeUrls => Promise.all(map(getJSON, gradeUrls)))
    .then(map(item => head(item)))
    .then(map(obj => prop('grades', obj)))
    .then(map(arr => join(",", arr)))
    .then(join(","))
    .then(split(","))
    .then(map(str => +str))
    .then(average)
    .then(grade => IO.of(grade).map(console.log).run())
    .catch(e => console.error(e))


export const AsyncHandling = () => {
    return (<h3>AsyncHandling</h3>)
}