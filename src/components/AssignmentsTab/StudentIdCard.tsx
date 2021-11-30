import { updateStudentIdRequest } from "@/actions/detail";
import { AppState } from "@/reducers";
import { Card, CardHeader, CardContent, TextField, CardActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { SyntheticEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
interface StudentIdcardProps {
    studentId?: string,
    classId: number
}

const StudentIdCard: React.FC<StudentIdcardProps> = ({studentId, classId})=>{
    
    const loading = useSelector((state:AppState)=>state.detail.loading)
    const dispatch = useDispatch()
    const [edit, setEdit]=useState(studentId?false:true)

    const handleUpdateStudentId = (event: SyntheticEvent)=>{
        event.preventDefault()
        const target = event.target as typeof event.target & {
            studentId: { value: string };
        }
        dispatch(updateStudentIdRequest(classId, target.studentId.value))
        onCancelEdit()
    }

    const onEdit = ()=>{
        setEdit(true)
    }

    const onCancelEdit = ()=>{
        setEdit(false)
    }

    return (
        <Card sx={{marginTop:4, marginLeft:{md:8}, width:{md:'75%'}}}>
            <CardHeader title="Student ID"/>
            {edit?(
                    <Box
                        component="form"
                        onSubmit={handleUpdateStudentId}
                        autoComplete="off"
                        noValidate={false}
                    >
                        <CardContent>
                            <TextField
                                label="Student ID"
                                variant="outlined"
                                name="studentId"
                                defaultValue={studentId}
                            />
                        </CardContent>
                        <CardActions sx={{ justifyContent: "flex-end", mr:1}}>
                            <Button onClick={onCancelEdit}>Cancel</Button>
                            <Button type="submit">Update</Button>
                        </CardActions>
                    </Box>
                ):(
                    <>
                        <CardContent>{studentId}</CardContent>
                        <CardActions sx={{ justifyContent: "flex-end", mr:1}}>
                            <Button onClick={onEdit}>Edit</Button>
                        </CardActions>
                    </>
                )
            }               
        </Card>
    )
}

export default StudentIdCard;