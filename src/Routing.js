import React, {useEffect, useRef, useState} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

export const Routing = ()=> {
    return (
        <HashRouter>
            <Switch>
                <Route path = '/'>
                    <LandingPage/>
                </Route>
            </Switch>
        </HashRouter>

    )
}
