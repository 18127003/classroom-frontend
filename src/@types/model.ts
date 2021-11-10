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
    name: string,
    id: number,
    role?:string
}

export interface AuthRequestInfo {
    username: string,
    password: string
}

export interface GetClassroomsCriteria {
    reload: boolean
}