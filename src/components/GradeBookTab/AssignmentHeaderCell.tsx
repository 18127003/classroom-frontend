import { Assignment } from "@/@types/model"
import React, { useEffect, useState } from "react"
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { Typography, IconButton, TableCell } from "@mui/material";
import SimpleConfirmDialog from "../Dialog/SimpleConfirmDialog";
import useFinalizeAssignment from "@/hooks/useFinalizeAssignment";

type AssignmentHeaderCellProps = {
    assignment: Assignment,
    key: any
}

const AssignmentHeaderCell: React.FC<AssignmentHeaderCellProps> = ({assignment})=>{
    const [confirm, setConfirm] = useState(false)
    const {finalizeAssignment, finalizeWarningAssignment, acceptWarning, warn} = useFinalizeAssignment(assignment.id)

    const onFinalizeIconClick = ()=>{setConfirm(true)}

    const onConfirm = ()=>{
        finalizeAssignment()
    }

    const onConfirmWarning = ()=>{
        finalizeWarningAssignment()
    }

    const handleClose = ()=>{setConfirm(false)}

    const handleCloseWarning = ()=>{acceptWarning()}

    return (
        <>
            <TableCell
                key={assignment.id}
                align='center'
                style={{ width:100 }}
            >
                <Typography overflow={'hidden'}>
                    {assignment.name}
                </Typography>
                {
                    assignment.status==='FINAL'?(
                        <IconButton>
                            <AssignmentTurnedInOutlinedIcon fontSize='small'/>
                        </IconButton>
                    ):(
                        <IconButton onClick={onFinalizeIconClick}>
                            <PendingActionsOutlinedIcon fontSize='small'/>
                        </IconButton>
                    )
                }
            </TableCell> 
            <SimpleConfirmDialog 
                isOpen = {confirm}
                title={`Finalize assignment ${assignment.name}`} 
                onConfirm={onConfirm} 
                loading={false}
                handleClose={handleClose}
            />
            <SimpleConfirmDialog 
                isOpen = {warn?true:false}
                title={warn} 
                onConfirm={onConfirmWarning} 
                loading={false}
                handleClose={handleCloseWarning}
            />
        </>
             
    )
}

export default AssignmentHeaderCell