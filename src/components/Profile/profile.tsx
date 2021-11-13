import * as React from 'react';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { useSelector } from 'react-redux';
import { AppState } from '@/reducers';

const Profile:React.FC=()=>{
  const account = useSelector((state:AppState)=>state.auth.user)
    return(
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={`${account.name} ava`} />
        </ListItemAvatar>
        <ListItemText
          primary={account.name}
          secondary={
              <React.Fragment>
                {`${account.id} - ${account.email}`}
              </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </List>
    )
}
export default Profile