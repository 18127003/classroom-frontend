import * as React from 'react';
import Badge from '@mui/material/Badge';
import { Notifications } from '@mui/icons-material';
import PopupMenu from '../PopupMenu';
import PopupMenuItem from '../PopupMenu/PopupMenuItem';
import { Divider, List, Typography } from '@mui/material';

const BadgeNotification=()=> {
    const notifications=["1","fgehr","sfheriueoruqywuywefhsdbfjahfkhes",
    "1","fgehr","sfheriueoruqywuywefhsdbfjahfkhes","1","fgehr","sfheriueoruqywuywefhsdbfjahfkhes"]
  return (
    <PopupMenu 
    id="notification-menu"
    button=
    {<Badge 
        badgeContent={notifications.length>99?'99+':notifications.length} 
        sx={{"& .MuiBadge-badge": { color:  "white" , backgroundColor:  'rgba(0, 128, 0, 0.3)' }}}>
        <Notifications />
      </Badge>}
    >
        <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding:0 },
      }}>
           <Typography variant='h5' color={'teal'}  paddingLeft={2}><strong>Notifications</strong></Typography>
        {
            notifications.map(notification=>
                
                (<>
                <PopupMenuItem title={notification}>
                </PopupMenuItem>
                 </>)
            )
        }
        </List>
        
    </PopupMenu>
    
  );
}
export default  BadgeNotification