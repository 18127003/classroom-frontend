import { combineReducers } from "redux";
import { accountReducer } from "./account";
import { adminReducer } from "./admin";
import { assignmentReducer } from "./assignment";
import { authReducer } from "./auth";
import { classroomsReducer } from "./classrooms";
import { detailReducer } from "./detail";
import { gradeReducer } from "./grade";

const rootReducer = combineReducers({
    auth: authReducer,
    classrooms: classroomsReducer,
    detail: detailReducer,
    account: accountReducer,
    assignment: assignmentReducer,
    grade: gradeReducer,
    admin: adminReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;