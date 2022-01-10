
import { Account, AssignedClassroom, Assignment, AuthRequestInfo, ChangePasswordRequestInfo, Classroom, 
    GetDataCriteria, GradeReview, GradeReviewComment, InvitationRequestInfo, JoinRequestInfo, ModifyParticipantsInfo, StudentInfo, 
    Submission } from "@/@types/model"
import { LOCAL_STORAGE_CLASSES_NAME } from "@/constants/common"
import Cookies from "universal-cookie"
import { api } from "./api"

const getClassrooms = async (criteria: GetDataCriteria) =>{
    let localData = localStorage.getItem(LOCAL_STORAGE_CLASSES_NAME)
    if(!localData || criteria.reload){
        try {
            const res = await api.getData()
            saveLocal(LOCAL_STORAGE_CLASSES_NAME, res.data)
            localData = localStorage.getItem(LOCAL_STORAGE_CLASSES_NAME)
        } catch(e){
            return null;
        }
    }
    if(localData){
        return JSON.parse(localData)
    }
    return null;
}

const addClassroom = async (classroom: Classroom)=>{
    return await api.createClassroom(classroom)
}

const joinClassroom = async (request: JoinRequestInfo)=>{
    return await api.joinClassroom(request.code, request.role)
}

const saveLocal = (item: string, data: any)=>{
    localStorage.setItem(item, JSON.stringify(data))
}

const testConnection = async ()=>{
    return await api.testConnection()
}

const saveCookies = (name:string, value:any)=>{
    const cookies = new Cookies();
    cookies.set(name,value,{
        'path':'/',
        'maxAge':3600
    })
}

const requestResetPassword = async (email:string) => {
    await api.requestResetPassword(email);
}

const resetPassword = async (password:string,token:string) => {
    await api.resetPassword(password,token);
}

const addClassroomLocal = (classroom: AssignedClassroom)=>{
    let newData: AssignedClassroom[] = []
    let localData = localStorage.getItem(LOCAL_STORAGE_CLASSES_NAME)
    if (localData){
        newData = JSON.parse(localData)
    }
    newData.push(classroom)
    saveLocal(LOCAL_STORAGE_CLASSES_NAME, newData)
}

const login = async (auth: AuthRequestInfo)=>{
    return await api.login(auth);
}

const adminLogin = async (auth: AuthRequestInfo)=>{
    return await api.adminLogin(auth);
}

const logout = async ()=>{
    return await api.logout();
}

const signup = async (account: Account)=>{
    return await api.signup(account);
}

const socialLogin = async (tokenId: string)=>{
    return await api.socialLogin(tokenId)
}

const getParticipants = async (classId: number)=>{
    return await api.getParticipants(classId)
}

const getClassroomDetail = async (classId: number)=>{
    try{
        const res = await api.getClassroomDetail(classId)
        return res.data
    } catch(e){
        return null;
    }
}

const sendInvitationMail = async (request: InvitationRequestInfo)=>{
    await api.sendInvitationMail(request.classId, request.invitations, request.role)
}

const updateAccount = async (account: Account)=>{
    return await api.updateAccount(account)
}

const changePassword = async (request: ChangePasswordRequestInfo)=>{
    return await api.changePassword(request)
}

const removeParticipants = async (request: ModifyParticipantsInfo)=>{
    return await api.removeParticipants(request.id, request.participants)
}

const hideParticipants = async (request: ModifyParticipantsInfo)=>{
    return await api.hideParticipants(request.id, request.participants)
}

const getAssignments = async (id: number)=>{
    return await api.getAssignments(id)
}

const addAssignment = async (id:number, assignment: Assignment)=>{
    return await api.addAssignment(id, assignment)
}

const removeAssignment = async (classId:number, id: number)=>{
    await api.removeAssignment(classId, id)
}

const updateAssignment = async (classId:number,id:number, assignment: Assignment)=>{
    return await api.updateAssignment(classId,id, assignment)
}

const updateAssignmentPosition = async (id:number, update:Assignment[])=>{
    await api.updateAssignmentPosition(id, update.map(assignment=>assignment.id))
}

const getStudentInfos = async (id: number)=>{
    return await api.getStudentInfos(id)
}

const importStudentInfos = async (id:number, file: File)=>{
    const formData = new FormData()
    formData.append('file', file)
    await api.importStudentInfos(id, formData)
}

const updateStudentId = async (studentInfo: StudentInfo)=>{
    await api.updateStudentId(studentInfo)
}

const exportTemplate = async (id:number)=>{
    var res = await api.exportTemplate(id)
    const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'template.xlsx');
    link.click();
    link.remove();
}

const addSubmission = async (classId:number,id:number, submission:Submission)=>{
    return await api.addSubmission(classId, id, submission)
}

const importSubmission = async (classId: number, assignmentId: number, file:File)=>{
    const formData = new FormData()
    formData.append('file', file)
    await api.importSubmission(classId, assignmentId, formData)
}

const updateSubmission = async (classId: number, assignmentId: number, submissionId:number, grade:number)=>{
    return await api.updateSubmission(classId, assignmentId, submissionId, grade)
}

const getOverallGrade = async (classId: number)=>{
    return await api.getOverallGrade(classId)
}

const getStudentClassGrade = async (classId: number)=>{
    return await api.getStudentClassGrade(classId)
}

const getStudentGradeReview = async (classId: number)=>{
    return await api.getStudentGradeReview(classId)
}

const createGradeReview = async (classId: number, assignmentId: number, gradeReview: GradeReview)=>{
    return await api.creatGradeReview(classId, assignmentId, gradeReview)
}

const checkFillSubmission =async (classId:number, assignmentId: number) => {
    return await api.checkFillSubmission(classId, assignmentId)
}

const finalizeAssignment =async (classId:number, assignmentId: number) => {
    await api.finalizeAssignment(classId, assignmentId)
}

const commentGradeReview = async (classId: number, assignmentId: number, reviewId:number, comment: GradeReviewComment)=>{
    return await api.commentGradeReview(classId, assignmentId, reviewId, comment)
}

const finalizeGradeReview =async (classId: number, assignmentId: number, reviewId:number, grade:number) => {
    return await api.finalizeGradeReview(classId, assignmentId, reviewId, grade)
}

const sendActivateAccountEmail =async (email:string) => {
    await api.sendActivateAccountEmail(email)
}

const activateAccount =async (token:string) => {
    await api.activateAccount(token)
}

export const authService = {
    login,
    logout,
    signup,
    socialLogin,
    testConnection,
    adminLogin,
    requestResetPassword,
    resetPassword,
    sendActivateAccountEmail,
    activateAccount
}

export const accountService = {
    updateAccount,
    changePassword,
    updateStudentId,
}

export const classroomService = {
    getClassrooms,
    addClassroom,
    addClassroomLocal,
    joinClassroom,
    getParticipants,
    getClassroomDetail,
    sendInvitationMail,
    removeParticipants,
    hideParticipants,
    getStudentInfos,
    importStudentInfos,
}

export const assignmentService = {
    getAssignments,
    addAssignment,
    updateAssignmentPosition,
    removeAssignment,
    updateAssignment,
    exportTemplate,
    addSubmission,
    importSubmission,
    updateSubmission,
    checkFillSubmission,
    finalizeAssignment
}

export const gradeService = {
    getOverallGrade,
    getStudentClassGrade,
    getStudentGradeReview,
    createGradeReview,
    commentGradeReview,
    finalizeGradeReview
}

export const commonService = {
    saveLocal,
    saveCookies,
}