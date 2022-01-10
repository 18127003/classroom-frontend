import React, { useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { Notifications } from '@mui/icons-material';
import PopupMenu from '../PopupMenu';
import PopupMenuItem from '../PopupMenu/PopupMenuItem';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/reducers';
import { getNotificationRequest } from '@/actions/notification';

const BadgeNotification: React.FC = () => {
  const notifications = useSelector((state: AppState)=>state.noti.notification.data)
  const reload = useSelector((state:AppState)=>state.noti.notification.reload)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(reload){
      dispatch(getNotificationRequest())
    }
  },[reload])

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
        <PopupMenuItem 
          title={(<Typography variant='h5' color={'teal'} paddingLeft={2} width={300}>
                    <strong>Notifications</strong>
                  </Typography>)}
        />
        {
          notifications.map(notification =>
            (<PopupMenuItem title={notification.content} key={notification.id}/>)
          )
        }
    </PopupMenu>

  );
}
export default BadgeNotification