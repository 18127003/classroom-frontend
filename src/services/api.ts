import { Account, Assignment, AuthRequestInfo, ChangePasswordRequestInfo, Classroom, Submission } from '@/@types/model';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://classroom-spring.herokuapp.com/api',
    // baseURL:'http://localhost:8080/api',
    withCredentials: true
});

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

const updateAccount = (id:number, account: Account)=>instance({
    'method':'PUT',
    'url':`/account/${id}/update`,
    'data':account,
    transformResponse: [(data) => JSON.parse(data)]
})

const changePassword = (id:number, request: ChangePasswordRequestInfo)=>instance({
    'method':'PATCH',
    'url':`/account/${id}/change_password`,
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
    'url':`/classroom/${id}/assignment/studentInfo/all`,
    transformResponse: [(data) => JSON.parse(data)]
})

const importStudentInfos = (id:number, formData: FormData)=>instance({
    'method':'POST',
    'url':`/classroom/${id}/assignment/studentInfo/import`,
    'data': formData
})

const addSubmission = (id:number, assignmentId:number, submission: Submission)=>instance({
    'method':'POST',
    'url':`/classroom/${id}/assignment/${assignmentId}/submission/create`,
    'data':submission,
    transformResponse: [(data) => JSON.parse(data)]
})

const updateStudentId = (id:number, studentId: string)=>instance({
    'method':'PATCH',
    'url':`/classroom/${id}/participant/studentId/update?v=${studentId}`
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
    updateSubmission
}