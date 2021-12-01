import { GradeCellProps } from "@/@types/props";
import { addSubmissionRequest } from "@/actions/assignment";
import { Alert, Snackbar, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GradeCell:React.FC<GradeCellProps> = ({submission})=>{
    const [grade, setGrade] = useState<number|null>(null)
    const [errorMsg, setErrorMsg] = useState<string|null>(null)
    const [error, setError] = useState(false);
    const dispatch = useDispatch()

    const onFocusOut = (event)=>{
        const temp = event.target.value
        if(!temp) return;
        if(/^([0-9]+)$/.test(temp) && temp <= submission.maxGrade){
            setError(false)
            dispatch(addSubmissionRequest(submission.classroomId, submission.assignmentId, {
                ...submission,
                grade: temp
            }))
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

    return(
        <>
            <Stack direction='row' alignItems='flex-end' mb={submission.grade?0:3} justifyContent="center">
                {submission.grade??(
                    <TextField 
                        variant="standard" 
                        onBlur={onFocusOut}
                        // type='number' 
                        size='small' 
                        error={error}
                        margin='dense'
                        // inputProps={{max: submission.maxGrade, min:0}}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                )}
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