import { Account, Classroom } from "@/model/model";

type ClassroomGridProps = {
    classes: Classroom[]
}

type ClassroomCardProps = {
    classroom: Classroom
}

type ClassCreateButtonProps = {
    onMenuItemClick: ()=>void
    onPostCreate: (classroom: Classroom)=>void
    onPreCreate: ()=>void
}

type BasicAppBarProps = {
    auth: Account|null
    onClassPostCreate: (classroom: Classroom)=>void
    onClassPreCreate: ()=>void
}