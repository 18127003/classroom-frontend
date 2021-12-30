import React, { SyntheticEvent, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { AddGradeReviewDialogProps } from "@/@types/props";
import useAssignments from "@/hooks/useAssignments";

const AddGradeReviewDialog: React.FC<AddGradeReviewDialogProps> = ({isOpen, handleClose, handleSubmit})=>{
    const [assignment, setAssignment]=useState('')
    const {assignments} = useAssignments()

    const handleSelectAssignment = (event: SelectChangeEvent)=>{
        setAssignment(event.target.value as string);
    }

    const onSubmit = async (event: SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            expectGrade: { value: number };
            explanation: { value: string };
        };
        handleSubmit(assignment as unknown as number, {
            expectGrade: target.expectGrade.value,
            explanation: target.explanation.value
        });
        handleClose();
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Create grade review</DialogTitle>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '96%' },
                }}
                autoComplete="off"
            >
                <DialogContent>
                    <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1}} rowSpacing={2}>
                        <Grid item md={8} sm={8} xs={4}>
                            <FormControl fullWidth variant='outlined' sx={{mt:1, ml:1, width:'96%'}}>
                                <InputLabel id="select-assignment-label">Assignment</InputLabel>
                                <Select
                                    
                                    required
                                    labelId="select-assignment"
                                    id="select-assignment"
                                    value={assignment}
                                    label="Assignment"
                                    onChange={handleSelectAssignment}
                                    // error={selectError}
                                >
                                    {assignments.map(assignment=>(
                                        <MenuItem value={assignment.id} key={assignment.id}>{assignment.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sm={8} xs={4}>
                            <TextField
                                required
                                id="expectGrade"
                                label="Expected Grade"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: "0" }}
                                name="expectGrade"
                                defaultValue={0}
                            />
                        </Grid>
                        <Grid item md={12} sm={8} xs={4}>
                            <TextField
                                required
                                id="explanation"
                                label="Explanation"
                                variant="outlined"
                                multiline
                                maxRows={4}
                                name="explanation"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </DialogActions>
            </Box>
      </Dialog>
    )
}

export default AddGradeReviewDialog