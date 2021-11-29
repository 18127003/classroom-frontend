import { combineReducers } from "redux";
import { accountReducer } from "./account";
import { assignmentReducer } from "./assignment";
import { authReducer } from "./auth";
import { classroomsReducer } from "./classrooms";
import { detailReducer } from "./detail";

const rootReducer = combineReducers({
    auth: authReducer,
    classrooms: classroomsReducer,
    detail: detailReducer,
    account: accountReducer,
    assignment: assignmentReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;