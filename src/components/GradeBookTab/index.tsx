import useAssignments from "@/hooks/useAssignments";
import useStudentInfos from "@/hooks/useStudentInfos";
import { AppState } from "@/reducers";
import { FileDownload, FileUpload, FlashOffOutlined, UploadFile } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent, Stack, 
    Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import GradeTable from "./GradeTable";

const GradeBookTab = ()=>{
    const {studentInfos, handleImport,handleExport, handleUploadGrade} = useStudentInfos()
    const {assignments} = useAssignments()
    const loading = useSelector((state:AppState)=>state.assignment.loading)
    const [selectUpload, setSelectUpload]=useState('')
    const [selectError, setSelectError]=useState(false)

    const handleSelectUpload = (event: SelectChangeEvent) => {
        setSelectUpload(event.target.value as string);
        setSelectError(false)
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files[0];
        if(!file) {
            return;
        }
        handleImport(file)
    }

    const handleUploadSubmission = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files[0];
        if(!file) {
            return;
        }
        if(selectUpload!==''){
            handleUploadGrade(selectUpload as unknown as number, file)
        }
    }

    const onChooseUploadSubmission = (event)=>{
        if(selectUpload===''){
            event.preventDefault()
            setSelectError(true)
        }
    }

    return (
        <>
            
            <Stack direction="row" mb={3} mt={3} spacing={2} alignItems='flex-end' justifyContent='flex-end'>
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
                <label htmlFor="upload-file">
                    <input
                        style={{ display: 'none' }}
                        id="upload-file"
                        name="upload-file"
                        onChange={handleUpload}
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <Tooltip title="Import student list">
                        <Button color="primary" size="small" aria-label="import-student-info" variant="outlined" component="span">
                            <FileUpload />
                        </Button>
                    </Tooltip>
                </label>
                <Tooltip title="Export template file">
                    <Button 
                        color="primary" 
                        size="small" 
                        aria-label="export-template" 
                        variant="outlined" 
                        onClick={handleExport} 
                        component="span"
                    >
                        <FileDownload />
                    </Button>
                </Tooltip>
            </Stack>
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <GradeTable studentInfos={studentInfos} assignments={assignments}/>
        </>
        
    )
}

export default GradeBookTab;