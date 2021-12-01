import { ImportStudentButtonProps } from "@/@types/props";
import { AppState } from "@/reducers";
import { FileUpload } from "@mui/icons-material";
import { Tooltip, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SimpleConfirmDialog from "../Dialog/SimpleConfirmDialog";

const ImportStudentButton: React.FC<ImportStudentButtonProps> = ({onUploadConfirm})=>{

    const [file, setFile]=useState<File|null>(null)
    const [confirm, setConfirm]=useState(false)
    const loading = useSelector((state:AppState)=>state.assignment.loading)

    const onConfirm = ()=>{
        onUploadConfirm(file)
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const upload = event.target.files[0];
        if(!upload) {
            return;
        }
        setFile(upload)
        setConfirm(true)
        event.target.value=""
    }
    
    const onClose = ()=>{
        setConfirm(false)
        setFile(null)
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
                <Tooltip title="Import student list">
                    <Button color="primary" size="small" aria-label="import-student-info" variant="outlined" component="span">
                        <FileUpload />
                    </Button>
                </Tooltip>
            </label>
            <SimpleConfirmDialog
                isOpen={confirm}
                title="This will append to current student list, existed student in the list will not be changed and student id cell data format must be text. Recommended: use template file provided to import."
                onConfirm={onConfirm}
                loading={loading}
                handleClose={onClose}
            />
        </>
    )
}

export default ImportStudentButton;