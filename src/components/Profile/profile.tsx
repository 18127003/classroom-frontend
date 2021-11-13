import * as React from 'react';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material"
import { ProfileProps } from '@/@types/props';

const Profile:React.FC<ProfileProps>=({account})=>{
    return(
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={`${account.name} ava`} src="/static/images/avatar/1.jpg" />
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