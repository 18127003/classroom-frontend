import authSaga from "@/actions/auth";
import classroomsSaga from "@/actions/classrooms";
import { all, fork } from "@redux-saga/core/effects";

export function* rootSaga(){
    yield all([fork(authSaga), fork(classroomsSaga)]);
}