import React from "react";
import AssignmentCard from "./AssignmentCard";
import EditAssignmentCard from "./EditAssignmentCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAssignmentDnD from "@/hooks/useAssignmentsDnD";
import { Stack } from "@mui/material";

const GradeStructure: React.FC = () => {
    const { getLocal, editing, onDragEnd, onAdd, onEdit, onPostModify } = useAssignmentDnD()
    const local = getLocal()

    return (
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
                                                onAdd={onAdd}
                                                onPostModify={onPostModify}
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
                                                    onAdd={onAdd}
                                                    onPostModify={onPostModify}
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
    )
}

export default GradeStructure;