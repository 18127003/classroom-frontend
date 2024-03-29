import accountSaga from "@/actions/account";
import adminSaga from "@/actions/admin";
import assignmentSaga from "@/actions/assignment";
import authSaga from "@/actions/auth";
import classroomsSaga from "@/actions/classrooms";
import detailSaga from "@/actions/detail";
import gradeSaga from "@/actions/grade";
import notificationSaga from "@/actions/notification";
import { all, fork } from "@redux-saga/core/effects";
import wsWatcher from "@/actions/websocketSaga";

export function* rootSaga(){
    yield all([
        fork(authSaga), 
        fork(classroomsSaga), 
        fork(detailSaga), 
        fork(accountSaga),
        fork(assignmentSaga),
        fork(gradeSaga),
        fork(adminSaga),
        fork(notificationSaga),
        fork(wsWatcher)
    ]);
}