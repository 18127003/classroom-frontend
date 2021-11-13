import React, { SyntheticEvent } from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Avatar, Tab} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { AppState } from '@/reducers';
import PopupMenu from '../PopupMenu';
import { CreateClassDialog } from '../Dialog/CreateClassdialog';
import PopupMenuItem from '../PopupMenu/PopupMenuItem';
import LogoutDialog from '../Dialog/LogoutDialog';
import TabList from '@mui/lab/TabList';
import { Link } from 'react-router-dom';
import Profile from '../Profile/profile';
import { ModeEdit } from '@mui/icons-material';

type ClassroomAppBarProps = {
  handleChangeTab: (event: SyntheticEvent, newValue:string)=>void
}

const ClassroomAppBar: React.FC<ClassroomAppBarProps> = ({handleChangeTab}) => {
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
            <Link to="/" style={{textDecoration:'none'}}>
              <Typography variant="h6" component="div">
                  Classroom
              </Typography>
            </Link>

            <TabList onChange={handleChangeTab} aria-label="classroom-tabs" centered sx={{flexGrow:1}}>
              <Tab label="News" value="1"/>
              <Tab label="Assignments" value="2"/>
              <Tab label="Participants" value="3"/>
            </TabList>


            <PopupMenu 
                id="profile-menu"
                icon={<Avatar sx={{ bgcolor: 'rgba(0, 128, 0, 0.3)' }}>{auth.name.slice(0,2)}</Avatar>}
            >
                <PopupMenuItem title="Profile" button={<IconButton><ModeEdit/></IconButton>}>
                <Profile account={auth}/>
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

export default ClassroomAppBar;