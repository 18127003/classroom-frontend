import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAssignmentDnD from "@/hooks/useAssignmentsDnD";
import { Fab, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AssignmentCard from "./AssignmentCard";
import EditAssignmentCard from "./EditAssignmentCard";

const GradeStructure: React.FC = () => {
    const { getLocal, editing, onDragEnd, onCreateTemp, onEdit, onPostModify } = useAssignmentDnD()
    const local = getLocal()

    return (
        <>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <Stack mt={4} spacing={4}>
                            {!editing && local.length === 0 && (
                                <Draggable key="none" draggableId="-1" index={0}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <EditAssignmentCard
                                                index={local.length}
                                                onAdd={onCreateTemp}
                                                onPostModify={onPostModify}
                                                dragging={snapshot.isDragging}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )}
                            {local.map((assignment, index) => (
                                <Draggable key={index} draggableId={`${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {index === editing ? (
                                                <EditAssignmentCard
                                                    assignment={assignment}
                                                    index={index}
                                                    onAdd={onCreateTemp}
                                                    onPostModify={onPostModify}
                                                    dragging={snapshot.isDragging}
                                                />
                                            )
                                                : (
                                                    <AssignmentCard assignment={assignment} onEdit={onEdit} index={index} />
                                                )}
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
        <Fab 
            color="primary" 
            aria-label="add" 
            sx={{position: 'fixed', bottom: 32, right: 32,}}
            onClick={()=>{onCreateTemp(0)}}
        >
            <AddIcon />
        </Fab>
      </>
    )
}

export default GradeStructure;