import React from "react"
import * as R from 'ramda'
import * as _ from 'lodash'
import Maybe from "../../monads/Maybe/Maybe";
import Either from "../../monads/Either/Either";
import {when, lt, always, __, complement, isNil, ifElse, is, partial, curry, toLower, split, join, tap} from 'ramda'

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

    const checkValue = val =>
        ifElse(complement(isNil(__)),
            (val) => Either.right(val),
            () => Either.left('Null or Undefined values are detected!: '))(val)

    const typeCheck = val =>
        ifElse(is(String, __),
            (val) => Either.right(val),
            () => Either.left('Type error!'))(val)

    const alphabet = () =>
        ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const isLetter = (alphabet, letter) => alphabet.some(item => item === letter.toLowerCase())
    const isLetterWithAlphabet = partial(isLetter, [alphabet()])

    const getLetterIndex = (alphabet, val) => val.map(letter => alphabet.indexOf(letter) + 1)
    const getLetterIndexWithAlphabet = partial(getLetterIndex, [alphabet()])

    const lettersFilter = curry((isLetter, val) => val.filter(item => isLetter(item)))(isLetterWithAlphabet)

    const my_alphabetPosition = (text) =>
        Maybe.fromNullable(text)
            .chain(checkValue)
            .chain(typeCheck)
            .map(toLower)
            .map(split(""))
            .map(lettersFilter)
            .map(getLetterIndexWithAlphabet)
            .map(join(" "))


    // console.log(my_alphabetPosition("The sunset sets at twelve o' clock.").orElse(console.error));

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

    // const isTrueTen = val => R.ifElse(R.equals(R.__, 10), () => "true", () => "false")(val)
    // console.log(isTrueTen(11));

    // const forever21 = R.ifElse(R.gte(__, 21), (v) => v, R.inc)
    // console.log(forever21(60));

    // const sayHi = (val) => `hi ${__} !`("Mike")
    // console.log(sayHi());

    // const adding = curry((a, b, c) => a + b + c)(__, 2, 0)
    // // const addingTwoLastArgs = adding(__, 2, 3)
    // // console.log(addingTwoLastArgs(15));
    // console.log(adding(15));

    // x > 5 && x < 10
    // R.both(R.gt(x, 5), R.lt(x, 10))

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     Complete the method/function so that it converts dash/underscore delimited words into camel casing.
//     The first word within the output should be capitalized only if the original word
//     was capitalized (known as Upper Camel Case, also often referred to as Pascal case).
//
//     Examples
//     "the-stealth-warrior" gets converted to "theStealthWarrior"
//     "The_Stealth_Warrior" gets converted to "TheStealthWarrior"

    // const toCamelCase = str =>
    //     str.split(/[^a-zA-Z]/gi)
    //         .map((w, i) => i > 0 ? w[0].toUpperCase() + w.substring(1) : w)
    //         .join("")
    //

    const toCamelCase = str =>
        str.replace(/[_-]\w/gi, ch => ch[1].toUpperCase());


    console.log(toCamelCase("The-stealth-warrior"));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.
//
//         Your task is to write a function maskify, which changes all but the last four characters into '#'.
//
//         Examples
//     maskify("4556364607935616") == "############5616"
//     maskify(     "64607935616") ==      "#######5616"
//     maskify(               "1") ==                "1"
//     maskify(                "") ==                 ""
//
// // "What was the name of your first pet?"
//     maskify("Skippy")                                   == "##ippy"
//     maskify("Nananananananananananananananana Batman!") == "####################################man!"

    const maskify = (cc) =>
        cc.slice(0, -4)
            .replace(/./g, '#') + cc.slice(-4);


    console.log(maskify("4556364607935616"));


    return (
        <h1>Included!</h1>
    )
}