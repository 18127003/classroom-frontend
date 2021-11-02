import { Classroom } from "@/model/Classroom";

type ClassroomGridProps = {
    classes: Classroom[]
}

type ClassroomCardProps = {
    classroom: Classroom
}

type ClassCreateButtonProps = {
    onPostCreate: (classroom: Classroom)=>void
    onPreCreate: ()=>void
}

type BasicAppBarProps = {
    onClassPostCreate: (classroom: Classroom)=>void
    onClassPreCreate: ()=>void
}