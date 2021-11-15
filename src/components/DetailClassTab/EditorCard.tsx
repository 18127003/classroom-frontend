import { AppState } from "@/reducers";
import { Card, CardContent, Stack, Avatar, Typography, CardActions, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Editor from "./Editor";

const EditorCard = ()=>{
    const accountName = useSelector((state:AppState)=>state.account.detail.lastName)
    const [showEditor,setShowEditor]=React.useState(false)

    const handleEditorClick=()=>{
      setShowEditor(!showEditor)
    }
  
    return (
        <Card sx={{alignItems:"center"}}>
            {
                !showEditor && (
                    <CardContent onClick={()=>{handleEditorClick()}}>
                        <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{color:"teal"}}>{accountName.slice(0,2)}</Avatar>
                        <Typography variant="body2">Notice to your class</Typography>
                    </Stack>
                    </CardContent>
                )
            }
            {
                showEditor && (
                    <>
                        <CardContent>
                            <Editor />
                        </CardContent>
                        <CardActions sx={{justifyContent:"flex-end"}}>
                            <Button onClick={()=>{handleEditorClick()}}>Cancel</Button>
                            <Button>Post</Button>
                        </CardActions>
                    </>
                )
            }
        </Card>
    )
}

export default EditorCard;

