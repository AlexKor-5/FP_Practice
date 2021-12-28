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
} from "ramda"
import IO from "../../monads/IO/IO"

const fork = (join, f1, f2) => val => join(f1(val), f2(val))
const trace = curry((msg, val) => console.log(msg + ':' + val));

const append = curry((elementId, info) => {
    document.querySelector(elementId).innerHTML = info;
    return info;
});

const result = getJSON('https://61cad4fd194ffe0017788980.mockapi.io/students')
    .then(json => json)
    .then(filter(s => s.address.country === 'US'))
    .then(sortBy(prop('ssn')))
    .then(tap(data => console.log(data)))
    .then(map(student => {
        return getJSON(`https://61cad4fd194ffe0017788980.mockapi.io/students/${student.id}/grades`)
            .then(pluck('grades'))
            .then(head)
            .then(compose(Math.ceil, fork(divide, sum, length)))
            .then(grade => {
                return IO.of(mergeRight(student, {grade: grade}))
                    .map(props(["name", "ssn", "grade"]))
                    .map(join(","))
                    .map(console.log).run()
            })
            .catch(e => console.error(e))
    }))
    .catch(e => console.error(e))


// getJSON('/students')
//     .then(hide('spinner'))
//     .then(R.filter(s => s.address.country == 'US'))
//     .then(R.sortBy(R.prop('ssn')))
//     .then(R.map(student => {
//         return getJSON('/grades?ssn=' + student.ssn)
//             .then(R.compose(Math.ceil,
//                 forkJoin(R.divide, R.sum, R.length)))
//             .then(grade =>
//                 IO.of(R.merge(student,
//                     {'grade': grade}))
//                     .map(R.props(['ssn', 'firstname',
//                         'lastname', 'grade']))
//                     .map(csv)
//                     .map(append('#student-info')).run())
//     );
//     }))
//     .catch(function(error) {
//         console.log('Error occurred: ' + error.message);
//     });


export const AsyncHandling = () => {
    return (<h3>AsyncHandling</h3>)
}