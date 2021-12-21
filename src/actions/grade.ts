import { GetOverallGradeRequest, GetOverallGradeSuccessPayload, GetOverallGradeSuccess, GetOverallGradeFail, 
    ReloadOverallGradeRequest, GetOverallGradeFailPayload} from "@/@types/grade.action";
import { gradeAction } from "@/constants/actions";
import { gradeService } from "@/services";
import { put, call, all, takeLatest } from "redux-saga/effects";

export const getOverallGradeRequest = (classId: number): GetOverallGradeRequest => ({
    type: gradeAction.GET_OVERALL_GRADE_REQUEST,
    payload: classId
});

export const getOverallGradeSuccess = (payload: GetOverallGradeSuccessPayload):GetOverallGradeSuccess =>({
    type: gradeAction.GET_OVERALL_GRADE_SUCCESS,
    payload: payload
});

export const getOverallGradeFail = (payload: GetOverallGradeFailPayload):GetOverallGradeFail =>({
    type: gradeAction.GET_OVERALL_GRADE_FAIL,
    payload: payload
});

export const reloadOverallGradeRequest = (): ReloadOverallGradeRequest => ({
    type: gradeAction.RELOAD_OVERALL_GRADE_REQUEST
});
 
function* getOverallGradeSaga(action: GetOverallGradeRequest) {
    try {
        const overall = yield call(gradeService.getOverallGrade, action.payload);
        yield put(getOverallGradeSuccess({
            overall: overall.data
        }))
    } catch (e) {
        yield put(getOverallGradeFail({
            error: 'Get overall grade failed'
        }))
    }
}

export function* gradeSaga() {
    yield all([
        takeLatest(gradeAction.GET_OVERALL_GRADE_REQUEST, getOverallGradeSaga)
    ]);
}

export default gradeSaga;