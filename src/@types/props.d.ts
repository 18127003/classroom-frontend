import { Classroom } from "@/model/Classroom";


type ClassroomGridProps = {
    classes: Classroom[]
}

type ClassroomCardProps = {
    classroom: Classroom
}

type ClassCreateButtonProps = {
    onCreate: (classroom: Classroom)=>void
}

type BasicAppBarProps = {
    onClassCreate: (classroom: Classroom)=>void
}