import React from "react"
import * as R from 'ramda'
import * as _ from 'lodash'
import Maybe from "../../monads/Maybe/Maybe";
import Either from "../../monads/Either/Either";
import {
    when,
    lt,
    always,
    __,
    complement,
    isNil,
    ifElse,
    is,
    partial,
    curry,
    toLower,
    split,
    join,
    tap,
    compose
} from 'ramda'

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


    // console.log(toCamelCase("The-stealth-warrior"));

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
        cc.slice(0, -4).replace(/./g, '#') + cc.slice(-4);


    // console.log(maskify("4556364607935616"));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     You probably know the "like" system from Facebook and other pages.
//     People can "like" blog posts, pictures or other items.
//     We want to create the text that should be displayed next to such an item.
//
//         Implement the function which takes an array containing the names of people that like an item.
//         It must return the display text as shown in the examples:
//
//             []                                -->  "no one likes this"
//             ["Peter"]                         -->  "Peter likes this"
//             ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
//             ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
//             ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
    const likes = names => {
        let res = ``;
        if (names.length >= 4) {
            res = `${names[0]}, ${names[1]} and ${names.length - 2} others like this`
        }
        if (names.length === 3) {
            res = `${names[0]}, ${names[1]} and ${names[2]} like this`
        }
        if (names.length === 2) {
            res = `${names[0]} and ${names[1]} like this`
        }
        if (names.length === 1) {
            res = `${names[0]} likes this`
        }
        if (names.length === 0) {
            res = `no one likes this`
        }
        return res
    }

    const moreEqualFour = names => names.length >= 4 ?
        `${names[0]}, ${names[1]} and ${names.length - 2} others like this` : names

    const equalThree = names => names.length === 3 ?
        `${names[0]}, ${names[1]} and ${names[2]} like this` : names

    const equalTwo = names => names.length === 2 ?
        `${names[0]} and ${names[1]} like this` : names

    const equalOne = names => names.length === 1 ? `${names[0]} likes this` : names

    const equalZero = names => names.length === 0 ? `no one likes this` : names

    const likes2 = compose(equalZero, equalOne, equalTwo, equalThree, moreEqualFour)
    //console.log(likes2(["Alex", "Jacob", "Mark", "Max"]));

    // console.log("likes = ", likes(["Alex", "Jacob", "Mark", "Max"]));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     An isogram is a word that has no repeating letters, consecutive or non-consecutive.
//     Implement a function that determines whether a string that contains only letters is an isogram.
//     Assume the empty string is an isogram. Ignore letter case.
//
//     "Dermatoglyphics" --> true
//     "aba" --> false
//     "moOse" --> false (ignore letter casing)

    const isIsogram = str => {
        return !str.toLowerCase()
            .split("")
            .find((letter, i, arr) =>
                arr.join("")
                    .substring(i + 1)
                    .split("")
                    .some(item => item === letter))
    }

    // console.log("isIsogram = ", isIsogram("moOse"));

    function isIsogramm(str) {
        return !/(\w).*\1/i.test(str)
    }

    function isIsograme(str) {
        return str.match(/([a-z]).*\1/i)
    }

    // console.log(isIsograme("moOse"));


    // console.log(isIsogramm("moOse"));
    // console.log("mose".match(/(\w).*\1/i))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //To be a senior, a member must be at least 55 years old and have a handicap greater than 7.
    // In this croquet club, handicaps range from -2 to +26; the better the player the lower the handicap.

    // input =  [(18, 20), (45, 2), (61, 12), (37, 6), (21, 21), (78, 9)]
    // output = ["Open", "Open", "Senior", "Open", "Open", "Senior"]

    const openOrSenior = (data) =>
        data.map(person => person[0] >= 55 ? ["Senior", person[1]] : ["Open", person[1]])
            .map(person => person[1] > 7 ? [person[0], "Senior"] : [person[0], "Open"])
            .map(person => person[0] === "Senior" && person[1] === "Senior" ? "Senior" : "Open")

    // console.log(openOrSenior([[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]));

    // Optimized
    const openOrSeniorNew = data =>
        data.map(([year, handicaps]) => (year > 55 && handicaps > 7) ? "Senior" : "Open")

    // console.log(openOrSeniorNew([[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]));

    // const change = str =>
    //     str.replace(/\(/g, "[")
    //         .replace(/\)/g, "]")
    //
    // console.log(change(old));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     Make a program that filters a list of strings and returns a list with only your friends name in it.
//
//         If a name has exactly 4 letters in it, you can be sure that it has to be a friend of yours!
//         Otherwise, you can be sure he's not...
//
//     Ex: Input = ["Ryan", "Kieran", "Jason", "Yous"], Output = ["Ryan", "Yous"]
//
//     i.e.
//
//         friend ["Ryan", "Kieran", "Mark"] `shouldBe` ["Ryan", "Mark"]

    const friend = friends => friends.filter(friend => /^\w\w\w\w$/i.test(friend))

    // console.log(friend(["Ryan", "Kieran", "Mark"]));
    // console.log(/^\w\w\w\w$/i.test("Kiery"))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     Complete the solution so that the function will break up camel casing, using a space between words.
//
//         Example
//     "camelCasing"  =>  "camel Casing"
//     "identifier"   =>  "identifier"
//     ""             =>  ""


    const solution = string => string.replace(/[A-Z]/g, n => " " + n)

    // console.log(solution("camelCasingTest"));


    return (
        <h1>Included!</h1>
    )
}