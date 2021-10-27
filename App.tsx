import React, { Suspense, lazy, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { LS } from "./src/classes/ls";
import { changeCenter, changeLanguage } from "./src/actions/actionCreator";
import Header from "./src/containers/Header/Header";

const Main = lazy(() => import("./src/containers/Main/Main"));
const Guide = lazy(() => import("./src/containers/Guide/Guide"));
const Listener = lazy(() => import("./src/containers/Listener/Listener"));
const Profile = lazy(() => import("./src/containers/Profile/Profile"));
const Login = lazy(() => import("./src/containers/Login/Login"));

const App = () => {

    const { t } = useTranslation();
    const dispatch: any = useDispatch();

    useEffect(() => {
        let ls = LS.get("settings");
        if (ls) {
            // history.push(ls.user);
            if (typeof ls["language"] !== "undefined") {
                dispatch(changeLanguage(ls.language));
            }
        } else {
            // history.push("/listener");
            LS.set("settings", { user: "listener", language: "ru" });
        }
        if (navigator.geolocation) {
            let startPos: Array<number> = [];
            let geoSuccess = function (position: any) {
                startPos[0] = position.coords.latitude;
                startPos[1] = position.coords.longitude;
                dispatch(changeCenter(startPos.reverse()));
            };
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }
    }, []);
    
    return (
        <Router>
            <Header />
            <Suspense fallback={<div>{t("loading")}</div>}>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/guide">
                        <Guide />
                    </Route>

                    <Route path="/listener">
                        <Listener />
                    </Route>

                    <Route path="/profile">
                        <Profile />
                    </Route>

                    <Route path="*">
                        <Redirect to={"/"} />
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;
