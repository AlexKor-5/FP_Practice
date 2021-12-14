import React from "react"
import * as R from 'ramda'
import * as _ from 'lodash'
import Maybe from "../../monads/Maybe/Maybe";
import Either from "../../monads/Either/Either";

export const MyApp = () => {

///////////////////////////////////////////////////////////////////////////////////
//     In this kata you are required to, given a string, replace every letter with its position in the alphabet.
//     If anything in the text isn't a letter, ignore it and don't return it.
//
//     "a" = 1, "b" = 2, etc.
//
//         Example
//     alphabetPosition("The sunset sets at twelve o' clock.")
//
//     Should return "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11" (as a string)
////////////////////////////////////////////////////////////////////////////////////////////////////


    const checkValue = val => val ? Either.right(val) : Either.left('Null or Undefined values are detected!: ')
    const typeCheck = val => R.is(String, val) ? Either.right(val) : Either.left('Type error!')

    const alphabet = () => ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const isLetter = (alphabet, letter) => alphabet.some(item => item === letter.toLowerCase())
    const isLetterWithAlphabet = R.partial(isLetter, [alphabet()])

    const getLetterIndex = (alphabet, val) => val.map(letter => alphabet.indexOf(letter) + 1)
    const getLetterIndexWithAlphabet = R.partial(getLetterIndex, [alphabet()])

    const lettersFilter = R.curry((isLetter, val) => val.filter(item => isLetter(item)))
    const curriedLettersFilter = lettersFilter(isLetterWithAlphabet)

    const my_alphabetPosition = (text) =>
        Maybe.fromNullable(text)
            .chain(checkValue)
            .chain(typeCheck)
            .map(R.toLower)
            .map(R.split(""))
            .map(curriedLettersFilter)
            .map(getLetterIndexWithAlphabet)
            .map(R.join(" "))

    console.log(my_alphabetPosition("The sunset sets at twelve o' clock.").orElse(console.error));

    // const arr = [2, 4, 5, 7, 8, 9, 10]
    // const str = "The sunset sets at twelve o' clock.";
    // console.log(str.split());


    // function alphabetPosition2(text) {
    //     return text
    //         .toUpperCase()
    //         .match(/[a-z]/gi)
    //         .map((c) => c.charCodeAt() - 64)
    //         .join(' ');
    // }
    //

    return (
        <h1>Included!</h1>
    )
}