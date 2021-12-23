import { GradeCellProps } from "@/@types/props";
import { addSubmissionRequest, updateSubmissionRequest } from "@/actions/assignment";
import { AppState } from "@/reducers";
import { Alert, Box, Snackbar, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GradeCell:React.FC<GradeCellProps> = ({submission})=>{
    const [edit, setEdit] = useState(submission.grade!==undefined?false:true)
    const [errorMsg, setErrorMsg] = useState<string|null>(null)
    const [error, setError] = useState(false);
    const dispatch = useDispatch()
    const classId = useSelector((state:AppState)=>state.detail.detail.id)

    const onFocusOutAdd = (event)=>{
        const temp = event.target.value
        if(!temp) return;
        if(/^([0-9]+)$/.test(temp) && temp <= submission.maxGrade){
            setError(false)
            dispatch(addSubmissionRequest(classId, submission.assignmentId, {
                ...submission,
                grade: temp
            }))
            setEdit(false)
        } else {
            setError(true)
            setErrorMsg("Invalid grade")
        }
    }

    const onFocusOutUpdate = (event)=>{
        const temp = event.target.value
        setEdit(false)
        if(!temp) return;
        if(/^([0-9]+)$/.test(temp) && temp <= submission.maxGrade){
            setError(false)
            dispatch(updateSubmissionRequest(classId, submission.assignmentId, submission.id, temp))
        } else {
            setError(true)
            setErrorMsg("Invalid grade")
            
        }
    }

    const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setErrorMsg(null);
    };    

    const onEdit = ()=>{
        setEdit(true)
    }

    return(
        <>
            <Stack direction='row' alignItems='flex-end' mb={edit?3:0} justifyContent="center">
                {edit?(
                    <TextField 
                        variant="standard" 
                        onBlur={submission.id?onFocusOutUpdate:onFocusOutAdd}
                        autoFocus={submission.id?true:false}
                        size='small' 
                        error={error}
                        margin='dense'
                        defaultValue={submission.grade}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                ):<Box onClick={onEdit}>{submission.grade}</Box>}
                /
                {submission.maxGrade}
            </Stack>
            <Snackbar open={errorMsg?true:false} autoHideDuration={3000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default GradeCell;