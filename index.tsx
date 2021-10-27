import React, { Suspense } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./src/redusers";
import { addEvent, changeLanguage } from "./src/actions/actionCreator";

import App from "./App";
import "./src/css/index.css";
import "./src/js/i18";

let store: any;

if (window.location.hostname === "localhost") {
    store = createStore(
        allReducers,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
} else {
    store = createStore(allReducers);
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw_audio.js", { scope: "/" });
    });
}

window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    store.dispatch(addEvent(e));
});

// Определение языковой локали
let config = {
    language: "ru",
    country: "RU",
};

let client = window.navigator ? window.navigator.language : config.language;

let language =
    client.search("-") > 0
        ? client.substring(0, client.search("-")).toLowerCase()
        : client.toLowerCase();

store.dispatch(changeLanguage(language));

render(
    <Suspense fallback="loading">
        <Provider store={store}>
            <App />
        </Provider>
    </Suspense>,
    document.getElementById("root")
);
