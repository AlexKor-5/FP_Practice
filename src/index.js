import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {MyApp} from "./components/MyApp/MyApp";

const destination = document.querySelector("#container");

ReactDOM.render(
    <>
        <MyApp/>
    </>,
    destination
);