import { Account, Assignment, AuthRequestInfo, ChangePasswordRequestInfo, Classroom, GradeReview, StudentInfo, Submission } from '@/@types/model';
import { LOCAL_REFRESH_TOKEN, TEST_SERVER_BASE_URL } from '@/constants/common';
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://classroom-spring.herokuapp.com/api',
    baseURL: TEST_SERVER_BASE_URL,
    withCredentials: true
});

instance.interceptors.response.use(
    response=>response,
    async error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 400 && originalRequest.url.includes('/auth/refreshToken')) {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.status === 401) {
            const refreshToken = localStorage.getItem(LOCAL_REFRESH_TOKEN);
            try {
                var rt = await instance.get(`/auth/refreshToken/${refreshToken}`)
                localStorage.setItem(LOCAL_REFRESH_TOKEN, rt.data)
                return instance(originalRequest)
            } catch (e){
                window.location.href = '/login/';
            }    
        }
        // specific error handling done elsewhere
        return Promise.reject(error);
    }
)

const getData = () => instance({
    'method':'GET',
    'url':'/classroom/all',
    transformResponse: [(data) => JSON.parse(data)]
})

const createClassroom = (classroom: Classroom) => instance({
    'method':'POST',
    'url':'/classroom/create',
    'data': classroom,
    transformResponse: [(data) => JSON.parse(data)]
})

const login = (auth: AuthRequestInfo) => instance({
    'method':'POST',
    'url':'/auth/login',
    'data': auth,
    transformResponse: [(data) => JSON.parse(data)]
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
    transformResponse: [(data) => JSON.parse(data)]
})

const logout = () => instance({
    'method':'POST',
    'url':'/auth/logout'
})

const signup = (account: Account)=>instance({
    'method':'POST',
    'url':'/account/create',
    'data': account,
    transformResponse: [(data) => JSON.parse(data)]
})

const testConnection = ()=>instance({
    'method':'GET',
    'url':'/auth/testConnection'
})

const socialLogin = (tokenId: string)=>instance({
    'method':'POST',
    'url':'/auth/socialLogin',
    'data': tokenId,
    transformResponse: [(data) => JSON.parse(data)]
})

const joinClassroom = (code: string, role?: string)=>instance({
    'method':'POST',
    'url':'/classroom/join',
    'params':{
        'code': code,
        'role': role
    },
    transformResponse: [(data) => JSON.parse(data)]
})

const getParticipants = (classId: number)=> instance({
    'method':'GET',
    'url':`/classroom/${classId}/participant`,
    transformResponse: [(data) => JSON.parse(data)]
})

const getClassroomDetail = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}`,
    transformResponse: [(data) => JSON.parse(data)]
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
    transformResponse: [(data) => JSON.parse(data)]
})

const changePassword = (request: ChangePasswordRequestInfo)=>instance({
    'method':'PATCH',
    'url':`/account/change_password`,
    'data':request,
    transformResponse: [(data) => JSON.parse(data)]
})

const removeParticipants = (id: number, removals: number[])=>instance({
    'method':'DELETE',
    'url':`/classroom/${id}/removeParticipants`,
    'data':removals
})

const hideParticipants = (id: number, participants: number[])=>instance({
    'method':'PATCH',
    'url':`/classroom/${id}/hideParticipants`,
    'data':participants
})

const getAssignments = (id:number)=>instance({
    'method':'GET',
    'url':`/classroom/${id}/assignment/all`,
    transformResponse: [(data) => JSON.parse(data)]
})

const addAssignment = (id:number, assignment: Assignment)=>instance({
    'method':'POST',
    'url':`/classroom/${id}/assignment/create`,
    'data':assignment,
    transformResponse: [(data) => JSON.parse(data)]
})

const removeAssignment = (classId: number, id:number)=>instance({
    'method':'DELETE',
    'url':`/classroom/${classId}/assignment/${id}/remove`
})

const updateAssignment = (classId: number, id:number, assignment: Assignment)=>instance({
    'method':'PUT',
    'url':`/classroom/${classId}/assignment/${id}/update`,
    'data':assignment,
    transformResponse: [(data) => JSON.parse(data)]
})

const updateAssignmentPosition = (id:number, update: number[])=>instance({
    'method':'PATCH',
    'url':`/classroom/${id}/assignment/updatePosition`,
    'data': update
})

const getStudentInfos = (id:number)=>instance({
    'method':'GET',
    'url':`/classroom/${id}/studentInfo/all`,
    transformResponse: [(data) => JSON.parse(data)]
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
    transformResponse: [(data) => JSON.parse(data)]
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
    transformResponse: [(data) => JSON.parse(data)]
})

const getOverallGrade = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/submission/overall`,
    transformResponse: [(data) => JSON.parse(data)]
})

const getStudentClassGrade = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/submission/all`,
    transformResponse: [(data) => JSON.parse(data)]
})

const creatGradeReview = (classId: number, assignmentId: number, gradeReview: GradeReview)=>instance({
    'method':'POST',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/review/create`,
    'data': gradeReview,
    transformResponse: [(data) => JSON.parse(data)]
})

const getStudentGradeReview = (classId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/submission/review/all`,
    transformResponse: [(data) => JSON.parse(data)]
})

const checkFillSubmission = (classId: number, assignmentId: number)=>instance({
    'method':'GET',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/filled`,
    transformResponse: [(data) => JSON.parse(data)]
})

const finalizeAssignment = (classId: number, assignmentId: number)=>instance({
    'method':'PATCH',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/finalize`
})

const commentGradeReview = (classId:number, assignmentId:number, reviewId:number, comment: Comment)=>instance({
    'method':'POST',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/review/${reviewId}/comment/create`,
    'data':comment,
    transformResponse: [(data) => JSON.parse(data)]
})

const finalizeGradeReview = (classId:number, assignmentId:number, reviewId:number, grade:number)=>instance({
    'method':'PATCH',
    'url':`/classroom/${classId}/assignment/${assignmentId}/submission/review/${reviewId}/finalize?grade=${grade}`,
    transformResponse: [(data) => JSON.parse(data)]
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