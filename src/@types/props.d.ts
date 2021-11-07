import { Account, AssignedClassroom } from "@/model/model";

type ClassroomGridProps = {
    classes: AssignedClassroom[]
}

type ClassroomCardProps = {
    classroom: AssignedClassroom
}

type ClassCreateButtonProps = {
    onMenuItemClick: ()=>void
    onPostCreate: (classroom: AssignedClassroom)=>void
    onPreCreate: ()=>void
}

type BasicAppBarProps = {
    onClassPostCreate: (classroom: AssignedClassroom)=>void
    onClassPreCreate: ()=>void
}

type CreateClassDialogProps = {
    isOpen: boolean
    handleClose: ()=>void
    onPostCreate: (classroom: AssignedClassroom)=>void
    onPreCreate: ()=>void
}