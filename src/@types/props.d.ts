import { Account, AssignedClassroom, Classroom } from "@/@types/model";
import React from "react";
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
    button?: React.ReactNode
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

interface InviteParticipantDialogProps extends DialogProps{
    title: string,
    isStudent?: boolean
}

interface EditProfileDialogProps extends DialogProps{
}

interface ChangePasswordDialogProps extends DialogProps{
}

type ParticipantListProps={
    title: "Teachers"|"Students",
    hasCount: boolean,
    hasAddIcon?: boolean,
    data: Account[]
}
type DetailClassProps={
    detailClass:AssignedClassroom
    account:Account
}
interface BasicAppBarProps {
    titleFlexGrow?: boolean
    children?: React.ReactNode 
}