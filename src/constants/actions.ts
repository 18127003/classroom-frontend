export const classroomActions = {
    GETALL_REQUEST: 'GET_CLASSROOMS_REQUEST',
    GETALL_SUCCESS: 'GET_CLASSROOMS_SUCCESS',
    GETALL_FAILURE: 'GET_CLASSROOMS_FAILURE',
    RELOAD_REQUEST: 'RELOAD_REQUEST',
    ADD_REQUEST: 'ADD_CLASSROOM_REQUEST',
    ADD_SUCCESS: 'ADD_CLASSROOM_SUCCESS',
    ADD_FAILURE: 'ADD_CLASSROOM_FAILURE',
    JOIN_REQUEST: 'JOIN_CLASSROOM_REQUEST',
    JOIN_SUCCESS: 'JOIN_CLASSROOM_SUCCESS',
    JOIN_FAILURE: 'JOIN_CLASSROOM_FAILURE',
};

export const authActions = {
    LOGIN_REFRESH: 'LOGIN_REFRESH',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAIL: 'LOGOUT_FAIL',
    SIGNUP_REQUEST: 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAIL: 'SIGNUP_FAIL',
    SOCIAL_LOGIN_REQUEST: 'SOCIAL_LOGIN_REQUEST'
}

export const detailAction = {
    GET_PARTICIPANT_REQUEST: 'GET_PARTICIPANT_REQUEST',
    GET_PARTICIPANT_SUCCESS: 'GET_PARTICIPANT_SUCCESS',
    GET_PARTICIPANT_FAIL: 'GET_PARTICIPANT_FAIL',
    RELOAD_PARTICIPANT_REQUEST: 'RELOAD_PARTICIPANT_REQUEST',
    GET_DETAIL_REQUEST: 'GET_DETAIL_REQUEST',
    GET_DETAIL_SUCCESS: 'GET_DETAIL_SUCCESS',
    GET_DETAIL_FAIL: 'GET_DETAIL_FAIL',
    SEND_INVITATION_REQUEST: 'SEND_INVITATION_REQUEST',
}

export const accountAction = {
    UPDATE_ACCOUNT_REQUEST: 'UPDATE_ACCOUNT_REQUEST',
    UPDATE_ACCOUNT_SUCCESS: 'UPDATE_ACCOUNT_SUCCESS',
    UPDATE_ACCOUNT_FAIL: 'UPDATE_ACCOUNT_FAIL',
    UPDATE_PASSWORD_REQUEST: 'UPDATE_PASSWORD_REQUEST',
    UPDATE_PASSWORD_SUCCESS: 'UPDATE_PASSWORD_SUCCESS',
    UPDATE_PASSWORD_FAIL: 'UPDATE_PASSWORD_FAIL',
    INIT_ACCOUNT_REQUEST: 'INIT_ACCOUNT_REQUEST',
    INIT_ACCOUNT_SUCCESS: 'INIT_ACCOUNT_SUCCESS'
}

export const commonAction = {
    REDIRECT_REQUEST:'REDIRECT_REQUEST',
    REDIRECT_SUCCESS: 'REDIRECT_SUCCESS'
}