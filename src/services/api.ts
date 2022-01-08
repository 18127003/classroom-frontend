import { Account, Assignment, AuthRequestInfo, ChangePasswordRequestInfo, Classroom, GradeReview, StudentInfo, Submission } from '@/@types/model';
import { LOCAL_REFRESH_TOKEN, TEST_SERVER_BASE_URL } from '@/constants/common';
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'SERVER_BASE_URL',
    baseURL: TEST_SERVER_BASE_URL,
    withCredentials: true,
});

const transformFunc = data => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
}

instance.interceptors.response.use(
    response=>response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 ) {
            try {
                const refreshToken = JSON.parse(localStorage.getItem(LOCAL_REFRESH_TOKEN));
                var rt = await instance.get(`/auth/refreshToken/${refreshToken}`)
                localStorage.setItem(LOCAL_REFRESH_TOKEN, JSON.stringify(rt.data))
                return instance(originalRequest)
            } catch (e){
            }    
        }
        // specific error handling done elsewhere
        return Promise.reject(error);
    }
)

const getData = () => instance({
    'method':'GET',
    'url':'/classroom/all',
    transformResponse: [transformFunc]
})

const createClassroom = (classroom: Classroom) => instance({
    'method':'POST',
    'url':'/classroom/create',
    'data': classroom,
    transformResponse: [transformFunc]
})

const login = (auth: AuthRequestInfo) => instance({
    'method':'POST',
    'url':'/auth/login',
    'data': auth,
    transformResponse: [transformFunc]
})

const requestResetPassword = (email:string) => instance({
    'method':'POST',
    'url': `/account/resetPassword/request?email=${email}`

})

const resetPassword = (password:string, token:string) => instance({
    'method':'PATCH',
    'url': `/account/resetPassword/`,
    'data':{
        token,
        password
    }
})

const adminLogin = (auth: AuthRequestInfo) => instance({
    'method':'POST',
    'url':'/auth/loginAdmin',
    'data': auth,
    transformResponse: [transformFunc]
})

const logout = () => instance({
    'method':'POST',
    'url':'/auth/logout'
})

const signup = (account: Account)=>instance({
    'method':'POST',
    'url':'/account/create',
    'data': account,
    transformResponse: [transformFunc]
})

const testConnection = ()=>instance({
    'method':'GET',
    'url':'/auth/testConnection'
})

const socialLogin = (tokenId: string)=>instance({
    'method':'POST',
    'url':'/auth/socialLogin',
    'data': tokenId,
    transformResponse: [transformFunc]
})

const joinClassroom = (code: string, role?: string)=>instance({
    'method':'POST',
    'url':'/classroom/join',
    'params':{
        'code': code,
        'role': role
    },
    transformResponse: [transformFunc]
})

const getParticipants = (classId: number)=> instance({
    'method':'GET',
    'url':`/classroom/${classId}/participant`,
    transformResponse: [(data) => JSON.parse(data)]
})

const getClassroomDetail = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}`,
    transformResponse: [transformFunc]
})

const sendInvitationMail = (classId: number, invitations: string[], role: 'STUDENT'|'TEACHER')=>instance({
    'method':'POST',
    'url':`/classroom/${classId}/invite?role=${role}`,
    'data': invitations
})

const updateAccount = (account: Account)=>instance({
    'method':'PUT',
    'url':`/account/update`,
    'data':account,
    transformResponse: [transformFunc]
})

const changePassword = (request: ChangePasswordRequestInfo)=>instance({
    'method':'PATCH',
    'url':`/account/change_password`,
    'data':request,
    transformResponse: [transformFunc]
})

const removeParticipants = (id: number, removals: string[])=>instance({
    'method':'DELETE',
    'url':`/classroom/${id}/removeParticipants`,
    'data':removals
})

const hideParticipants = (id: number, participants: string[])=>instance({
    'method':'PATCH',
    'url':`/classroom/${id}/hideParticipants`,
    'data':participants
})

const getAssignments = (id:number)=>instance({
    'method':'GET',
    'url':`/classroom/${id}/assignment/all`,
    transformResponse: [transformFunc]
})

const addAssignment = (id:number, assignment: Assignment)=>instance({
    'method':'POST',
    'url':`/classroom/${id}/assignment/create`,
    'data':assignment,
    transformResponse: [transformFunc]
})

const removeAssignment = (classId: number, id:number)=>instance({
    'method':'DELETE',
    'url':`/classroom/${classId}/assignment/${id}/remove`
})

const updateAssignment = (classId: number, id:number, assignment: Assignment)=>instance({
    'method':'PUT',
    'url':`/classroom/${classId}/assignment/${id}/update`,
    'data':assignment,
    transformResponse: [transformFunc]
})

const updateAssignmentPosition = (id:number, update: number[])=>instance({
    'method':'PATCH',
    'url':`/classroom/${id}/assignment/updatePosition`,
    'data': update
})

const getStudentInfos = (id:number)=>instance({
    'method':'GET',
    'url':`/classroom/${id}/studentInfo/all`,
    transformResponse: [transformFunc]
})

const importStudentInfos = (id:number, formData: FormData)=>instance({
    'method':'POST',
    'url':`/classroom/${id}/studentInfo/import`,
    'data': formData
})

const addSubmission = (id:number, assignmentId:number, submission: Submission)=>instance({
    'method':'POST',
    'url':`/classroom/${id}/assignment/${assignmentId}/submission/create`,
    'data':submission,
    transformResponse: [transformFunc]
})

const updateStudentId = (studentInfo: StudentInfo)=>instance({
    'method':'POST',
    'url':`/account/studentId/update`,
    'data':studentInfo
})

const exportTemplate = (id:number)=>instance({
    'method':'GET',
    'url':`/classroom/${id}/assignment/template/export`,
    'responseType':'blob'
})

const importSubmission = (id:number, assignmentId: number, formData: FormData)=>instance({
    'method':'POST',
    'url':`/classroom/${id}/assignment/${assignmentId}/submission/import`,
    'data':formData
})

const updateSubmission = (classId:number, assignmentId:number, submissionId: number, grade: number)=>instance({
    'method':'PATCH',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/${submissionId}/update?grade=${grade}`,
    transformResponse: [transformFunc]
})

const getOverallGrade = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/submission/overall`,
    transformResponse: [transformFunc]
})

const getStudentClassGrade = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/submission/all`,
    transformResponse: [transformFunc]
})

const creatGradeReview = (classId: number, assignmentId: number, gradeReview: GradeReview)=>instance({
    'method':'POST',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/review/create`,
    'data': gradeReview,
    transformResponse: [transformFunc]
})

const getStudentGradeReview = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/submission/review/all`,
    transformResponse: [transformFunc]
})

const checkFillSubmission = (classId: number, assignmentId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/filled`,
    transformResponse: [transformFunc]
})

const finalizeAssignment = (classId: number, assignmentId: number)=>instance({
    'method':'PATCH',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/finalize`
})

const commentGradeReview = (classId:number, assignmentId:number, reviewId:number, comment: Comment)=>instance({
    'method':'POST',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/review/${reviewId}/comment/create`,
    'data':comment,
    transformResponse: [transformFunc]
})

const finalizeGradeReview = (classId:number, assignmentId:number, reviewId:number, grade:number)=>instance({
    'method':'PATCH',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/review/${reviewId}/finalize?grade=${grade}`,
    transformResponse: [transformFunc]
})

export const api = {
    getData,
    createClassroom,
    login,
    logout,
    signup,
    socialLogin,
    joinClassroom,
    getParticipants,
    getClassroomDetail,
    sendInvitationMail,
    updateAccount,
    changePassword,
    testConnection,
    removeParticipants,
    hideParticipants,
    getAssignments,
    addAssignment,
    updateAssignmentPosition,
    removeAssignment,
    updateAssignment,
    getStudentInfos,
    importStudentInfos,
    addSubmission,
    updateStudentId,
    exportTemplate,
    importSubmission,
    updateSubmission,
    adminLogin,
    getOverallGrade,
    getStudentClassGrade,
    creatGradeReview,
    getStudentGradeReview,
    checkFillSubmission,
    finalizeAssignment,
    requestResetPassword,
    resetPassword,
    commentGradeReview,
    finalizeGradeReview
}