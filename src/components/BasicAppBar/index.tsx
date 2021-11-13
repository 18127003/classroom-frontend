import React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Avatar} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { useSelector } from 'react-redux';
import { AppState } from '@/reducers';
import PopupMenu from '../PopupMenu';
import PopupMenuItem from '../PopupMenu/PopupMenuItem';
import LogoutDialog from '../Dialog/LogoutDialog';
import { NavLink } from 'react-router-dom';
import Profile from '../Profile';
import { ModeEdit } from '@mui/icons-material';
import { EditProfileDialog } from '../Dialog/EditProfileDialog';
import {ChangePasswordDialog } from '../Dialog/ChangePasswordDialog';
import { BasicAppBarProps } from '@/@types/props';

const BasicAppBar: React.FC<BasicAppBarProps> = ({titleFlexGrow=true, children}) => {
  const user = useSelector((state:AppState)=>state.account.detail);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          
          <SchoolOutlinedIcon sx={{mr:2}} fontSize="large"/>
        
          <Typography variant="h5" component="div" sx={titleFlexGrow?{ flexGrow: 1 }:{}}>
            <NavLink to="/" style={{textDecoration:'none', color:'black'}}>
            Classroom
            </NavLink>
          </Typography>
          {
            children
          }
          <PopupMenu 
            id="profile-menu"
            icon={<Avatar sx={{ bgcolor: 'rgba(0, 128, 0, 0.3)' }}>{user.lastName.slice(0,2)}</Avatar>}
          >
            <PopupMenuItem title="Profile" button={<IconButton><ModeEdit/></IconButton>}>
              <Profile/>
              <EditProfileDialog />
            </PopupMenuItem>
            <PopupMenuItem title="Change Password">
              <ChangePasswordDialog/>
            </PopupMenuItem>
            <PopupMenuItem title="Logout">
              <LogoutDialog/>
            </PopupMenuItem>
          </PopupMenu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default BasicAppBar;