import accountSaga from "@/actions/account";
import authSaga from "@/actions/auth";
import classroomsSaga from "@/actions/classrooms";
import detailSaga from "@/actions/detail";
import { all, fork } from "@redux-saga/core/effects";

export function* rootSaga(){
    yield all([fork(authSaga), fork(classroomsSaga), fork(detailSaga), fork(accountSaga)]);
}