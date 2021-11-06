export interface Classroom{
    name: string,
    code: string|undefined,
    part: string,
    id: number|undefined,
    room: string,
    topic: string
}

export interface AssignedClassroom extends Classroom{
    role: string,
    creator:string
}

export interface Account {
    name: string,
    id: number,
    role:string|null
}