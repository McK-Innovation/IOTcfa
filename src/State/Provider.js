import React, {useReducer} from 'react'
import {reducer} from "./Reducer";
import {initialState} from "./InititalState";
import {CFAContext} from "./Context";

export const CFAProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CFAContext.Provider value={{ state, dispatch }}>
            {children}
        </CFAContext.Provider>
    );
};
