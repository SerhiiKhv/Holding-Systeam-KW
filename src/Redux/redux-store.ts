import {Action, applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";

let reducers = combineReducers({
    app: appReducer
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