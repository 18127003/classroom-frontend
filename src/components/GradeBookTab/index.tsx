import useAssignmentDnD from "@/hooks/useAssignmentsDnD";
import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import AssignmentCard from "./AssignmentCard";
import EditAssignmentCard from "./EditAssignmentCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GradeBookTab: React.FC = ()=>{
    const [editing,setEditing]=useState<number|null>(null)
    const {local, onDragEnd, onCreateTemp} = useAssignmentDnD()

    const onEdit=(value: number)=>{
        setEditing(value)
    }

    const onAdd=()=>{
        onCreateTemp(editing+1)
        setEditing(editing+1)
    }

    const onPostAdd=()=>{
        setEditing(null)
    }

    return (
        <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
           
            <Grid item md={8} sm={6} xs={4}>
                
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot)=> (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <Stack mt={4} spacing={4} ref={provided.innerRef}>
                                    {!editing&&local.length===0&&(
                                        <Draggable key="none" draggableId="-1" index={-1}>
                                            {(provided, snapshot)=>(
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <EditAssignmentCard index={local.length} onAdd={onAdd} onPostAdd={onPostAdd}/>
                                                </div>
                                            )}
                                        </Draggable>
                                    )}
                                    {local.map((assignment, index)=>(
                                        <Draggable key={index} draggableId={`${assignment.id}`} index={index}>
                                            {(provided, snapshot)=>(
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {index===editing?(
                                                        <EditAssignmentCard assignment={assignment} index={index} onAdd={onAdd} onPostAdd={onPostAdd}/>
                                                    )
                                                    :(<AssignmentCard assignment={assignment} onEdit={onEdit} index={index}/>)}
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