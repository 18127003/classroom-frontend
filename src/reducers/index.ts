import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { classroomsReducer } from "./classrooms";

const rootReducer = combineReducers({
    auth: authReducer,
    classrooms: classroomsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;