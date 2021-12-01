import useAssignments from "@/hooks/useAssignments";
import useStudentInfos from "@/hooks/useStudentInfos";
import { AppState } from "@/reducers";
import { FileDownload, FileUpload, FlashOffOutlined, UploadFile } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent, Stack, 
    Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AssignmentDropdown from "./AssignmentDropdown";
import GradeTable from "./GradeTable";
import ImportStudentButton from "./ImportStudentButton";

const GradeBookTab = ()=>{
    const {studentInfos, handleImport,handleExport, handleUploadGrade} = useStudentInfos()
    const {assignments} = useAssignments()
    const loading = useSelector((state:AppState)=>state.assignment.loading)
    
    return (
        <>
            <Stack direction="row" mb={3} mt={3} spacing={2} alignItems='flex-end' justifyContent='flex-end'>
                <AssignmentDropdown assignments={assignments} onUploadConfirm={handleUploadGrade}/>
                <ImportStudentButton onUploadConfirm={handleImport}/>
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