import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DetailClassProps } from "@/@types/props";
import { Avatar, Button, CardHeader, Collapse, Grid, IconButton, IconButtonProps, Link, Stack, styled } from "@mui/material";
import {  ContentCopyOutlined, InfoRounded, LinkOutlined, MoreVertOutlined, RefreshOutlined } from "@mui/icons-material";
import Editor from "./Editor";
import PopupMenu from "../PopupMenu";
import PopupMenuItem from "../PopupMenu/PopupMenuItem";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export const DetailClass: React.FC<DetailClassProps> = ({ detailClass,account }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [showEditor,setShowEditor]=React.useState(false)

    const handleExpandClick = () => {
      setExpanded(!expanded);
    }; 
    const handleEditorClick=()=>{
      setShowEditor(!showEditor)
    }
  return (
    <Grid container columns={{md:12, sm:8, xs:4}}>
      <Grid item md={2} sm={1}></Grid>
      <Grid item md={8} sm={6} xs={4}>
        <Grid
          container
          columns={{ md: 12, sm: 8, xs:4 }}
          columnSpacing={{ md: 4 }}
          rowSpacing={{ md: 4, sm:2, xs:2 }}
          sx={{ flexGrow: 1 }}
        >
          <Grid item md={12} sm={8} xs={4}>
            <Card
              sx={{ background: "rgba(0, 128, 0, 0.3)" }}
            >
              <CardContent sx={{minHeight:"150px", alignItems:"center",justifyContent:"center", alignContent:"center", justifyItems:"center"}}>
                <Typography variant="h4" component="div">
                  {detailClass.name}
                </Typography>
                <Typography variant="h5" >
                  {detailClass.part}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ }}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <InfoRounded />
            </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{background:"white"}}>
                {detailClass.role==="TEACHER"&&(<Typography paragraph>Classroom code: {detailClass.code}</Typography>)}
                {detailClass.topic&&(<Typography paragraph>{`Topic: ${detailClass.topic}`}</Typography>)}
                {detailClass.description&&(<Typography paragraph> {`Description: ${detailClass.description}`}</Typography>)}
                {detailClass.room&&(<Typography paragraph>{`Room: ${detailClass.room}`}</Typography>)}
                </CardContent>
            </Collapse>
            </Card>
          </Grid>
          <Grid item md={3} sm={8} xs={4}>
              <Stack spacing={2}>
              {detailClass.role==="TEACHER"&&(<Card>
              <CardHeader
                action={
                  <PopupMenu 
                    id="profile-menu"
                    button={<IconButton><MoreVertOutlined/></IconButton>}
                  >
                    <PopupMenuItem title="Copy invited link" button={<IconButton><LinkOutlined/></IconButton>}>
                    </PopupMenuItem>
                    <PopupMenuItem title="Copy Code" button={<IconButton><ContentCopyOutlined/></IconButton>}>
                    </PopupMenuItem>
                    <PopupMenuItem title="Change Code" button={<IconButton><RefreshOutlined/></IconButton>}>
                    </PopupMenuItem>
                  </PopupMenu>
                }
                title="Code"
              />
              <CardContent>
                <Typography sx={{ mb: 1.5 }} variant="body2" noWrap>
                  {detailClass.code}
                </Typography>
              </CardContent>
            </Card>)}
            <Card>
              <CardHeader
                title="Deadline"
              />
              <CardContent>
                <Typography sx={{ mb: 1.5 }} variant="body2" noWrap>
                  No deadline
                </Typography>
              </CardContent>
            </Card>
                </Stack>
            
          </Grid>
          <Grid item md={9} sm={8} xs={4}>
            <Card sx={{alignItems:"center"}}>
              {!showEditor &&(
              <CardContent onClick={()=>{handleEditorClick()}}>
                 <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{color:"teal"}}>{account.lastName.slice(0,2)}</Avatar>
                  <Typography variant="body2">Notice to your class</Typography>
                </Stack>
              </CardContent>)}
              {showEditor&&(
                <>
                <CardContent>
                  <Editor />
                </CardContent>
                <CardActions sx={{justifyContent:"flex-end"}}>
                  <Button onClick={()=>{handleEditorClick()}}>Cancel</Button>
                  <Button>Post</Button>
                </CardActions>
                </>
              )}
              </Card>
            
          </Grid>
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};
