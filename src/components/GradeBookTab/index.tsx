import useAssignmentDnD from "@/hooks/useAssignmentsDnD";
import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import AssignmentCard from "./AssignmentCard";
import EditAssignmentCard from "./EditAssignmentCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GradeBookTab: React.FC = ()=>{
    const [editing,setEditing]=useState<number|null>(null)
    const {assignments, onDragEnd} = useAssignmentDnD()

    const onEdit=(value: number)=>{
        setEditing(value)
    }
    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
           
            <Grid item md={8} sm={6} xs={4}>
                {!editing&&assignments.length===0&&<EditAssignmentCard index={assignments.length}/>}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot)=> (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <Stack mt={4} spacing={4} ref={provided.innerRef}>
                                    {assignments.map((assignment, index)=>(
                                        <Draggable key={assignment.id} draggableId={`${assignment.id}`} index={index}>
                                            {(provided, snapshot)=>(
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {assignment.id===editing?(<EditAssignmentCard assignment={assignment} index={index}/>)
                                                    :(<AssignmentCard assignment={assignment} onEdit={onEdit}/>)}
                                                </div>
                                            )}    
                                        </Draggable>
                                    ))}
                                </Stack>
                                {provided.placeholder}
                            </div>
                        )}
                        
                    </Droppable>
                </DragDropContext>
            </Grid>
        </Grid>
        
    )
}

export default GradeBookTab;