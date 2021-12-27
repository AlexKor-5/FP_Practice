import React from "react";
import ReactDOM from "react-dom";

// css
// import "./index.css";

// extension
import "./extensions/memoize"

import {MyApp} from "./components/MyApp/MyApp";
import {MySecondApp} from "./components/MySecondApp/MySecondApp.jsx";
import {Memoize} from "./components/Memoize/Memoize";
// import {OptimizationOne} from "./components/OptimizationOne/OptimizationOne";

const destination = document.querySelector("#container");

ReactDOM.render(
    <>
        {/*<MyApp/>*/}
        {/*<MySecondApp/>*/}
        {/*<OptimizationOne/>*/}
        <Memoize/>
    </>,
    destination
);