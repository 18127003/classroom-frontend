import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Divider, FormControlLabel, IconButton, Stack, Switch, TextField } from '@mui/material';
import { Add, ContentCopy, Image, TitleOutlined, YouTube } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignmentRequest, removeAssignmentRequest } from '@/actions/detail';
import { AppState } from '@/reducers';
import { EditAssignmentCardProps } from '@/@types/props';


const EditAssignmentCard: React.FC<EditAssignmentCardProps> = ({ assignment, index, onAdd, onPostAdd }) => {
  const dispatch = useDispatch()
  const classId = useSelector((state: AppState) => state.detail.detail.id)
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string };
      points: { value: number };

    }
    if(!assignment.id){
      dispatch(addAssignmentRequest(
        classId,
        {
          name: target.name.value,
          points: target.points.value,
          position: index
        }
      ));
      onPostAdd();
    }
    
  }

  const handleDelete = ()=>{
    dispatch(removeAssignmentRequest(classId, assignment.id))
  }

  return (
    <Stack direction="row" spacing={2}>
      <Card sx={{ width: "90%" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{

          }}
          autoComplete="off"
          noValidate={false}
        >
          <CardContent>

            <Stack direction="row" spacing={2} mb={2}>
              <TextField
                id="assignmentName"
                label="Name"
                variant="outlined"
                required
                sx={{ width: "75%" }}
                name="name"
                defaultValue={assignment && assignment.name}
              />
              <TextField
                id="assignmentPoints"
                label="Points"
                variant="outlined"
                type="number"
                inputProps={{ min: "0" }}
                name="points"
                defaultValue={assignment && assignment.points}
              />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={1} mb={1}>
              <IconButton><ContentCopy /></IconButton>
              <Divider orientation="vertical" flexItem />
              <FormControlLabel control={<Switch defaultChecked={false} />} label="Required" labelPlacement="start" />
            </Stack>
            <Divider />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", }}>
            {assignment&&assignment.id&&<Button onClick={handleDelete}>Delete</Button>}
            <Button type="submit">Save</Button>
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
