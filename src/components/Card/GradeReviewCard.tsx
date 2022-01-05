import { GradeReviewCardProps } from "@/@types/props";
import { AssignmentIndRounded, Person } from "@mui/icons-material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Card, CardHeader, Avatar, Divider, CardContent, List, ListItem, ListItemText, Typography, ListItemAvatar, Stack, Icon } from "@mui/material";
import React from "react";

const GradeReviewCard:React.FC<GradeReviewCardProps>=({review, onComment, onFinalize})=> {

    return (
        <Card>
            <CardHeader
                avatar={<Avatar sx={{background:"teal"}}><AssignmentIndRounded/></Avatar>}
                title={review.assignment}
                subheader={`Expect: ${review.expectGrade}`}
                >
            </CardHeader>
            
            <Divider/>
            <CardContent>
                {review.explanation}
            </CardContent> 
            <Divider/>
            <Stack direction="row" ml={2} mt={2} alignItems={"center"}>
                <Icon><PeopleAltOutlinedIcon/></Icon>
                <Typography ml={1}><strong>Comments</strong></Typography>
            </Stack>
            <List>
                {review.comments.map(comment=>(
                    <ListItem alignItems="flex-start" key={comment.id}>
                        <ListItemAvatar>
                            <Avatar sx={{background: 'teal'}}>
                                <Person/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={comment.by}
                            secondary={
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {comment.content}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
export default GradeReviewCard