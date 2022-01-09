import React from 'react';
import Badge from '@mui/material/Badge';
import { Notifications } from '@mui/icons-material';
import PopupMenu from '../PopupMenu';
import PopupMenuItem from '../PopupMenu/PopupMenuItem';
import { Typography } from '@mui/material';
import { Notification } from '@/@types/model';

const BadgeNotification: React.FC = () => {
  const notifications: Notification[] = []
  return (
    <PopupMenu
      id="notification-menu"
      maxHeight={300}
      button=
      {<Badge
        badgeContent={notifications.length > 99 ? '99+' : notifications.length}
        sx={{ "& .MuiBadge-badge": { color: "white", backgroundColor: 'rgba(0, 128, 0, 0.3)' } }}>
        <Notifications />
      </Badge>}
    >
        <PopupMenuItem title={''}>
          <Typography variant='h5' color={'teal'} paddingLeft={2} width={300}><strong>Notifications</strong></Typography>
        </PopupMenuItem>
        
        {
          notifications.map(notification =>
            (<PopupMenuItem title={notification.content} key={notification.id}/>)
          )
        }
    </PopupMenu>

  );
}
export default BadgeNotification