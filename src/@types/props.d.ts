import { Account, AssignedClassroom, Assignment, Classroom, GradeReview, StudentInfo, Submission } from "@/@types/model";
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

interface UpdateStudentIDDialogProps extends DialogProps{
    studentId: string|null
}

interface GradeReviewDialogProps extends DialogProps{
}

interface AddGradeReviewDialogProps extends DialogProps{
    handleSubmit: (assignmentId:number, gradeReview: GradeReview)=>void 
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
    fullWidth?: boolean
}

interface EditAssignmentCardProps{
    assignment?:Assignment
    index: number
    onAdd: (index:number)=>void
    onPostModify:()=>void
    dragging: boolean
}

interface EditorProps {
    content: string
    onChange: (value: string)=>void
}

interface GradeTableProps {
    studentInfos: StudentInfo[]
    assignments: Assignment[]
}

interface StudentRowProps {
    studentInfo: StudentInfo;
    assignments: Assignment[];
    totalMaxGrade: number;
}

interface GradeCellProps {
    submission: Submission
}

interface AssignmentDropdownProps {
    assignments: Assignment[]
    onUploadConfirm: (assignmentId: number, file: File)=>void
}

interface ImportStudentButtonProps {
    onUploadConfirm: (file:File)=>void
}

interface GradeReviewCardProps {
    review: GradeReview,
    onComment?: (gradeReview: GradeReview, comment:Comment)=>void,
    onFinalize?: (gradeReview: GradeReview, grade: number)=>void,
    key: any
}