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
    id?: number,
    email: string,
    role?:string,
    password?:string,
    firstName?:string,
    lastName?:string,
    studentId?:string,
    hidden?:boolean
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
    position?:number
}

export interface AuthRequestInfo {
    email: string,
    password: string
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
    participants: number[]
}

export interface ChangePasswordRequestInfo{
    oldPassword: string,
    newPassword:string
}

export interface GetClassroomsCriteria {
    reload: boolean
}

export interface Submission {
    id?:number,
    assignmentId: number,
    studentId: string,
    classroomId: number,
    grade:number
}

export interface StudentInfo {
    studentId: string,
    name: string,
    accountMail?: string,
    submissions: Submission[]
}