import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Divider, FormControlLabel, IconButton, Stack, Switch, TextField, Box } from '@mui/material';
import { Add, ContentCopy, Image, TitleOutlined, YouTube } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignmentRequest, removeAssignmentRequest, updateAssignmentRequest } from '@/actions/detail';
import { AppState } from '@/reducers';
import { EditAssignmentCardProps } from '@/@types/props';
import { Assignment } from '@/@types/model';
import { LoadingButton } from '@mui/lab';
import Editor from '../Editor';

const EditAssignmentCard: React.FC<EditAssignmentCardProps> = ({ assignment, index, onAdd, onPostModify }) => {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('')
  const classId = useSelector((state: AppState) => state.detail.detail.id)
  const loading = useSelector((state:AppState)=>state.detail.loading)

  useEffect(()=>{
    if(assignment){
      setDescription(assignment.description??'')
    }
  },[assignment])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string };
      points: { value: number };
      deadline: {value: string};
    }
    const formAssignment: Assignment = {
      name: target.name.value,
      points: target.points.value,
      deadline: target.deadline.value,
      description: description,
      position: index
    }
    if(!assignment || !assignment.id){
      dispatch(addAssignmentRequest(
        classId,
        formAssignment
      ));
    } else {
      dispatch(updateAssignmentRequest(
        classId,
        assignment.id,
        formAssignment
      ))
    }
    onPostModify();
  }

  const handleDelete = ()=>{
    dispatch(removeAssignmentRequest(classId, assignment.id))
  }
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Card sx={{ width: "90%" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate={false}
        >
          <CardContent>

            <Stack direction="row" spacing={2} mb={2}>
              <TextField
                autoFocus
                id="assignmentName"
                label="Name"
                variant="outlined"
                required
                sx={{ width: "75%" }}
                name="name"
                defaultValue={assignment && assignment.name}
              />
              <TextField
                required
                id="assignmentPoints"
                label="Points"
                variant="outlined"
                type="number"
                inputProps={{ min: "0" }}
                name="points"
                defaultValue={assignment && assignment.points}
              />
            </Stack>
            <Editor content={description} onChange={setDescription}/>
            <Stack direction="row" sx={{ justifyContent: "flex-start" }} spacing={1} mb={1} mt={2}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Deadline"
                variant="outlined"
                type="datetime-local"
                name="deadline"
                defaultValue={assignment && (assignment.deadline??'')}
              />
                <Box sx={{flexGrow:1}}/>  
                <IconButton><ContentCopy /></IconButton>
                <Divider orientation="vertical" flexItem />
                <FormControlLabel control={<Switch defaultChecked={false} />} label="Required" labelPlacement="start" />
            
            </Stack>
            <Divider />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", }}>
            {assignment&&assignment.id&&(
              <LoadingButton variant="outlined" onClick={handleDelete} sx={{m:2}} disabled={loading} loading={loading}>
                Delete  
              </LoadingButton>
            )}
            <LoadingButton variant="outlined" type="submit" sx={{m:2}} disabled={loading} loading={loading}>
              Save  
            </LoadingButton>
          </CardActions>
        </Box>
      </Card>
      <Card>
        <Stack>
          <IconButton onClick={onAdd}><Add/></IconButton>
          <IconButton ><TitleOutlined/></IconButton>
          <IconButton ><Image/></IconButton>
          <IconButton ><YouTube/></IconButton>
        </Stack>
      </Card>
    </Stack>
  );
}
export default EditAssignmentCard
