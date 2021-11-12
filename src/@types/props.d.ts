import { Account, AssignedClassroom } from "@/@types/model";
import { RouteProps } from "react-router-dom";

type ClassroomGridProps = {
    classes: AssignedClassroom[]
}

type ClassroomCardProps = {
    classroom: AssignedClassroom
}

interface PopupMenuButtonProps {
    onMenuItemClick?: ()=>void
    children?: React.ReactNode
    title: string
}

interface DialogProps {
    isOpen?: boolean
    handleClose?: ()=>void
}

interface CreateClassDialogProps extends DialogProps {}

interface JoinClassDialogProps extends DialogProps {}

interface LogoutDialogProps extends DialogProps{}

interface CustomRouteProps extends RouteProps {
    protected?: boolean
}

type ParticipantListProps={
    title: "Teachers"|"Students",
    hasCount: boolean,
    isStudent?: boolean,
    list: Account[]
}