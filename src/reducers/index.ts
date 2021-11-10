import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { classrooms } from "./classrooms";

const rootReducer = combineReducers({
    authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;