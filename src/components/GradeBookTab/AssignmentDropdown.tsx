import { AssignmentDropdownProps } from "@/@types/props";
import { AppState } from "@/reducers";
import { UploadFile } from "@mui/icons-material";
import { Box, FormControl, InputLabel, Select, MenuItem, Tooltip, Button, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SimpleConfirmDialog from "../Dialog/SimpleConfirmDialog";

const AssignmentDropdown: React.FC<AssignmentDropdownProps> = ({assignments, onUploadConfirm})=>{

    const [selectUpload, setSelectUpload]=useState('')
    const [selectError, setSelectError]=useState(false)
    const [file, setFile]=useState<File|null>(null)
    const [confirm, setConfirm]=useState(false)
    const loading = useSelector((state:AppState)=>state.assignment.loading)

    const handleSelectUpload = (event: SelectChangeEvent) => {
        setSelectUpload(event.target.value as string);
        setSelectError(false)
    };

    const handleUploadSubmission = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const upload = event.target.files[0];
        if(!upload) {
            return;
        }
        if(selectUpload!==''){
            setFile(upload)
            setConfirm(true)
            event.target.value=""
        }
    }

    const onChooseUploadSubmission = (event)=>{
        if(selectUpload===''){
            event.preventDefault()
            setSelectError(true)
        }
    }

    const onConfirm = ()=>{
        onUploadConfirm(selectUpload as unknown as number, file)
    }

    const onClose = ()=>{
        setConfirm(false)
        setFile(null)
    }

    return (
        <>
            <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth variant='standard'>
                    <InputLabel id="select-assignment-label">Assignment</InputLabel>
                    <Select
                        sx={{height:'50%'}}
                        labelId="select-assignment"
                        id="select-assignment"
                        value={selectUpload}
                        label="Assignment"
                        onChange={handleSelectUpload}
                        error={selectError}
                    >
                        {assignments.map(assignment=>(
                            <MenuItem value={assignment.id} key={assignment.id}>{assignment.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <label htmlFor="upload-submission">
                <input
                    style={{ display: 'none' }}
                    id="upload-submission"
                    name="upload-submission"
                    onChange={handleUploadSubmission}
                    onClick={onChooseUploadSubmission}
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <Tooltip title="Import grade">
                    <Button color="primary" size="small" aria-label="import-student-info" component="span" variant='outlined'>
                        <UploadFile />
                    </Button>
                </Tooltip>
            </label>
            <SimpleConfirmDialog
                isOpen={confirm}
                title="This will overwrite any submission graded in this assignment. Recommended: use template file provided to import."
                onConfirm={onConfirm}
                loading={loading}
                handleClose={onClose}
            />
        </>
    )
} 

export default AssignmentDropdown;