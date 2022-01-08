import { GradeReviewCardProps } from "@/@types/props";
import { AssignmentIndRounded, Person } from "@mui/icons-material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import { Card, CardHeader, Avatar, Divider, CardContent, List, ListItem, ListItemText, Typography, ListItemAvatar, Stack, Icon, 
    IconButton, 
    Tooltip} from "@mui/material";
import React from "react";
import GradeReviewActionButton from "../Button/GradeReviewActionButton";
import CommentCard from "../Comment/CommentCard";

const GradeReviewCard:React.FC<GradeReviewCardProps>=({review, viewOnly=true})=> {

    return (
        <Card>
            <Stack direction='row' alignItems='center'>
                <CardHeader
                    sx={{flexGrow:1}}
                    avatar={(
                        <Avatar sx={{background:"teal"}}>
                            {
                                review.status==="PENDING"?<PendingActionsRoundedIcon/>:<AssignmentIndRounded/>
                            }
                        </Avatar>
                    )}
                    title={review.assignment}
                    subheader={`Expect: ${review.expectGrade}`}
                    >
                        
                </CardHeader>
                {!viewOnly&&review.status==="PENDING"&&<GradeReviewActionButton review={review}/>}
            </Stack>
            
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
                {review.comments && review.comments.map(comment=>(
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
            <CommentCard review={review}/>
        </Card>
    );
}
export default GradeReviewCard