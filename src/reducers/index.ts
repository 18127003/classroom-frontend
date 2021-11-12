import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { classroomsReducer } from "./classrooms";
import { detailReducer } from "./detail";

const rootReducer = combineReducers({
    auth: authReducer,
    classrooms: classroomsReducer,
    detail: detailReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;