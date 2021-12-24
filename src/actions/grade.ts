
import { GetGradeRequest, GetGradeSuccessPayload, GetGradeSuccess, GetGradeFailPayload, GetGradeFail, ReloadGradeRequest, 
    GetGradeReviewFail, GetGradeReviewFailPayload, GetGradeReviewRequest, GetGradeReviewSuccess, GetGradeReviewSuccessPayload, 
    ReloadGradeReviewRequest, AddGradeReviewFail, AddGradeReviewFailPayload, AddGradeReviewRequest, AddGradeReviewSuccess,
    AddGradeReviewSuccessPayload} from "@/@types/grade.action";
import { GradeReview } from "@/@types/model";
import { gradeAction } from "@/constants/actions";
import { gradeService } from "@/services";
import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";

export const getGradeRequest = (classId: number): GetGradeRequest => ({
    type: gradeAction.GET_GRADE_REQUEST,
    payload: classId
});

export const getGradeSuccess = (payload: GetGradeSuccessPayload):GetGradeSuccess =>({
    type: gradeAction.GET_GRADE_SUCCESS,
    payload: payload
});

export const getGradeFail = (payload: GetGradeFailPayload):GetGradeFail =>({
    type: gradeAction.GET_GRADE_FAIL,
    payload: payload
});

export const reloadGradeRequest = (): ReloadGradeRequest => ({
    type: gradeAction.RELOAD_GRADE_REQUEST
});

function* getGradeSaga(action: GetGradeRequest) {
    try {
        const grades = yield call(gradeService.getStudentClassGrade, action.payload);
        yield put(getGradeSuccess({
           grade : grades.data
        }))
    } catch (e) {
        yield put(getGradeFail({
            error: 'Get grades failed'
        }))
    }
}

export const getGradeReviewRequest = (classId: number): GetGradeReviewRequest => ({
    type: gradeAction.GET_GRADE_REVIEW_REQUEST,
    payload: classId
});

export const getGradeReviewSuccess = (payload: GetGradeReviewSuccessPayload):GetGradeReviewSuccess =>({
    type: gradeAction.GET_GRADE_REVIEW_SUCCESS,
    payload: payload
});

export const getGradeReviewFail = (payload: GetGradeReviewFailPayload):GetGradeReviewFail =>({
    type: gradeAction.GET_GRADE_REVIEW_FAIL,
    payload: payload
});

export const reloadGradeReviewRequest = (): ReloadGradeReviewRequest => ({
    type: gradeAction.RELOAD_GRADE_REVIEW_REQUEST
});
 
function* getGradeReviewSaga(action: GetGradeReviewRequest) {
    try {
        const reviews = yield call(gradeService.getStudentGradeReview, action.payload);
        yield put(getGradeReviewSuccess({
           reviews : reviews.data
        }))
    } catch (e) {
        yield put(getGradeReviewFail({
            error: 'Get grade reviews failed'
        }))
    }
}

export const addGradeReviewRequest = (classId: number, assignmentId: number, gradeReview: GradeReview): AddGradeReviewRequest => ({
    type: gradeAction.ADD_GRADE_REVIEW_REQUEST,
    payload: {
        classId: classId,
        assignmentId: assignmentId,
        gradeReview: gradeReview
    }
});

export const addGradeReviewSuccess = (payload: AddGradeReviewSuccessPayload):AddGradeReviewSuccess =>({
    type: gradeAction.ADD_GRADE_REVIEW_SUCCESS,
    payload: payload
});

export const addGradeReviewFail = (payload: AddGradeReviewFailPayload):AddGradeReviewFail =>({
    type: gradeAction.ADD_GRADE_REVIEW_FAIL,
    payload: payload
});
 
function* addGradeReviewSaga(action: AddGradeReviewRequest) {
    try {
        const arg = action.payload
        const review = yield call(gradeService.createGradeReview, arg.classId, arg.assignmentId, arg.gradeReview);
        yield put(addGradeReviewSuccess({
           review : review.data
        }))
    } catch (e) {
        yield put(addGradeReviewFail({
            error: 'Add grade review failed'
        }))
    }
}

export function* gradeSaga() {
    yield all([
        takeLatest(gradeAction.GET_GRADE_REQUEST, getGradeSaga),
        takeLatest(gradeAction.GET_GRADE_REVIEW_REQUEST, getGradeReviewSaga),
        takeEvery(gradeAction.ADD_GRADE_REVIEW_REQUEST, addGradeReviewSaga)
    ]);
}

export default gradeSaga;