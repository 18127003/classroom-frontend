import React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Avatar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { AppState } from '@/reducers';
import PopupMenu from '../PopupMenu';
import { CreateClassDialog } from '../Dialog/CreateClassdialog';
import PopupMenuItem from '../PopupMenu/PopupMenuItem';
import LogoutDialog from '../Dialog/LogoutDialog';
import JoinClassDialog from '../Dialog/JoinClassDialog';
import { Link, NavLink } from 'react-router-dom';

const BasicAppBar: React.FC = () => {
  const auth = useSelector((state:AppState)=>state.auth.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={{textDecoration:'none'}}>
            Classroom
            </NavLink>
          </Typography>
          <PopupMenu
            id="classroom-menu"
            icon={<AddIcon />}
            iconSz={{
              size:"large",
              edge:"start",
              color:"inherit",
              sx:{ mr: 2 }
            }}
          >
            <PopupMenuItem title="Create Class">
              <CreateClassDialog/>
            </PopupMenuItem>
            <PopupMenuItem title="Join Class">
              <JoinClassDialog/>
            </PopupMenuItem>
          </PopupMenu>
          <PopupMenu 
            id="profile-menu"
            icon={<Avatar sx={{ bgcolor: 'rgba(0, 128, 0, 0.3)' }}>{auth.name.slice(0,2)}</Avatar>}
          >
            <PopupMenuItem title="Profile">
              <CreateClassDialog/>
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