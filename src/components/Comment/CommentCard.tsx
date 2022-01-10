import React from 'react';
import Box from '@mui/material/Box';
import { Avatar, IconButton, Stack, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import useGradeReview from '@/hooks/useGradeReview';
import { GradeReviewCommentProps } from '@/@types/props';
import { useSelector } from 'react-redux';
import { AppState } from '@/reducers';


const CommentCard:React.FC<GradeReviewCommentProps>=({review})=> {
    const username = useSelector((state:AppState)=>state.account.detail.lastName)
    
    const {comment}=useGradeReview();
    const onClick=async(event:React.SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            comment: { value: string };
        };
        comment(review,{content:target.comment.value})
    }
  return (
      <Box component="form" onSubmit={onClick} padding={2}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{flexGrow:1}}>
                <Avatar>{username.slice(0,2)}</Avatar>
                <TextField sx={{flex:1}} name="comment" variant="outlined" placeholder='write your comment' />
                <IconButton type="submit" size="small"><Send/></IconButton>
            </Stack>
        
      </Box>
    
  );
}
export default CommentCard;
