import authSaga from "@/actions/auth";
import { all, fork } from "@redux-saga/core/effects";

export function* rootSaga(){
    yield all([fork(authSaga)]);
}