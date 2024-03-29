export interface Classroom{
    name: string,
    code?: string,
    part?: string,
    id?: number,
    room?: string,
    topic?: string,
    description?: string,
    studentId?:string
}

export interface AssignedClassroom extends Classroom{
    role: 'TEACHER'|'STUDENT',
    creator: string
}

export interface Account {
    name?: string,
    id?: string,
    email: string,
    password?:string,
    firstName?:string,
    lastName?:string,
    studentId?:string,
    role?:string,
    status?: string
}

export interface Participant {
    name: string,
    accountId: string,
    email: string,
    studentId?:string,
    hidden:boolean,
    role:string
}

export interface Assignment {
    id?:number,
    name: string,
    description?: string,
    points: number,
    classroom?: string,
    creator?: string,
    deadline?: string,
    createdAt?:string,
    position?:number,
    status?: string
}

export interface AuthRequestInfo {
    email: string,
    password: string
    admin?: boolean
}

export interface InvitationRequestInfo {
    invitations: string[],
    classId: number,
    role: 'TEACHER'|'STUDENT'
}

export interface JoinRequestInfo {
    code: string,
    role?: string
}

export interface ModifyParticipantsInfo {
    id: number,
    participants: string[]
}

export interface ChangePasswordRequestInfo{
    oldPassword: string,
    newPassword:string
}

export interface GetDataCriteria {
    reload: boolean,
    desc?:boolean,
    q?:string
}

export interface Submission {
    id?:number,
    assignmentId: number,
    assignmentName: string,
    studentId: string,
    grade?:number,
    maxGrade: number
}

export interface StudentInfo {
    id?:number,
    studentId: string,
    name: string,
    accountMail?: string,
    submissions?: Submission[]
}

export interface GradeReviewComment {
    id?:number,
    reviewId?:number,
    content:string,
    by?:string
}

export interface GradeReview {
    expectGrade: number,
    explanation: string,
    id?:number,
    currentGrade?:number,
    assignment?:string,
    status?:string,
    author?:string,
    comments?:GradeReviewComment[],
    assignmentId?:number
}

export interface ClassNotification {
    id?: number,
    content: string
}