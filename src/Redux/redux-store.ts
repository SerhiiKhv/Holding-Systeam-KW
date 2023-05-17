import {Action, applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {enterprisePageReducer} from "./Reducers/enterprise-reducer";
import {companyPageReducer} from "./Reducers/company-reducer";
import {financialReportPageReducer} from "./Reducers/financialReport-reducer";
import {currencyPageReducer} from "./Reducers/currency-reducer";

let reducers = combineReducers({
    app: appReducer,
    enterprise: enterprisePageReducer,
    company: companyPageReducer,
    financialReport: financialReportPageReducer,
    currency: currencyPageReducer
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U: never
export type BaseThunkType<T extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, T>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store:Store<AppStateType> = createStore(reducers, composeEnhancers(
       applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.__store__ = store;

export default store;