export interface Classroom{
    name: string,
    code?: string,
    part?: string,
    id?: number,
    room?: string,
    topic?: string,
    description?: string
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
    studentId?:string
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

export interface ChangePasswordRequestInfo{
    oldPassword: string,
    newPassword:string
}

export interface GetClassroomsCriteria {
    reload: boolean
}