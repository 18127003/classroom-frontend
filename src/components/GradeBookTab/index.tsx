import useAssignments from "@/hooks/useAssignments";
import useStudentInfos from "@/hooks/useStudentInfos";
import { FileDownload, FileUpload } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import GradeTable from "./GradeTable";

const GradeBookTab = ()=>{
    const {studentInfos, handleImport,handleExport, classId} = useStudentInfos()
    const {assignments} = useAssignments()

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files[0];
        if(!file) {
            return;
        }
        handleImport(file)
    }

    return (
        <>
            <Stack direction="row">
                <label htmlFor="upload-file">
                    <input
                        style={{ display: 'none' }}
                        id="upload-file"
                        name="upload-file"
                        onChange={handleUpload}
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <IconButton color="primary" size="small" aria-label="import-student-info" component="span">
                        <FileUpload />
                    </IconButton>
                </label>
                <IconButton color="primary" size="small" aria-label="export-template" onClick={handleExport}>
                    <FileDownload />
                </IconButton>
            </Stack>
            <GradeTable studentInfos={studentInfos} assignments={assignments}/>
        </>
        
    )
}

export default GradeBookTab;