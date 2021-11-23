import { Account, AssignedClassroom, Assignment, Classroom } from "@/@types/model";
import { IconButtonProps } from "@mui/material";
import React from "react";
import { RouteProps } from "react-router-dom";

type ClassroomGridProps = {
    classes: AssignedClassroom[]
}

type ClassroomCardProps = {
    classroom: AssignedClassroom
}

type LoginPageProps={
    tab: "1"|"2"
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

interface SimpleConfirmDialogProps extends DialogProps {
    title: string,
    onConfirm: ()=>void,
    loading:boolean
}

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
    hasCount: boolean,
    hasAddIcon?: boolean,
    mode: "Student"|"Teacher"
    hasManage?:boolean,
    data: Account[]
}
type DetailClassTabProps={
    detailClass:AssignedClassroom
}
interface BasicAppBarProps {
    titleFlexGrow?: boolean
    children?: React.ReactNode,
    hasDrawer?:boolean 
}

interface CodeCardProps {
    code:string
}


interface DetailCardProps {
    detailClass:AssignedClassroom
}
interface DrawerItemProps{
    title:string
    toggleDrawer:any
    items:Classroom[]
    key: any
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface AssignmentCardProps{
    key?:number
    index?: number
    assignment:Assignment
    onEdit?:(value:number)=>void
}

interface EditAssignmentCardProps{
    assignment?:Assignment,
    index: number,
    onAdd: ()=>void,
    onPostModify:()=>void
}

interface EditorProps {
    content: string,
    onChange: (value: string)=>void
}