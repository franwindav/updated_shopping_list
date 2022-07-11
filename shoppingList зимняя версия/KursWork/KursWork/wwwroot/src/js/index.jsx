import React from "react";
import { render } from "react-dom";
import "../styles/index.less";
import App from "./app/index.jsx";

// Основная точка начала клиентской части
render(<App />, document.body.querySelector("#app"));