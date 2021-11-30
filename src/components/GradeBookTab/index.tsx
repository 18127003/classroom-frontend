import useStudentInfos from "@/hooks/useStudentInfos";
import { UploadFile } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const GradeBookTab = ()=>{
    const {studentInfos, handleImport, classId} = useStudentInfos()

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files[0];
        if(!file) {
            return;
        }
        handleImport(file)
    }

    return (
        <>
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
                    <UploadFile />
                </IconButton>
            </label>
            <ul>
                {studentInfos.map(info=>(
                    <li key={info.studentId}>{`${info.name}-${info.studentId}-${info.accountMail??''}`}</li>
                ))}
            </ul>
        </>
        
    )
}

export default GradeBookTab;