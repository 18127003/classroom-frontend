import { AssignedClassroom } from "@/@types/model";
import { RouteProps } from "react-router-dom";

type ClassroomGridProps = {
    classes: AssignedClassroom[]
}

type ClassroomCardProps = {
    classroom: AssignedClassroom
}

type ClassCreateButtonProps = {
    onMenuItemClick: ()=>void
}

type CreateClassDialogProps = {
    isOpen: boolean
    handleClose: ()=>void
}

interface CustomRouteProps extends RouteProps {
    protected?: boolean
}