import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import {MyApp} from "./components/MyApp/MyApp";
import {MySecondApp} from "./components/MySecondApp/MySecondApp.jsx";

const destination = document.querySelector("#container");

ReactDOM.render(
    <>
        {/*<MyApp/>*/}
        <MySecondApp/>
    </>,
    destination
);