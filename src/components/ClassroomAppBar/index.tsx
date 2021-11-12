import React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Avatar, Tabs, Tab} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { AppState } from '@/reducers';
import PopupMenu from '../PopupMenu';
import { CreateClassDialog } from '../Dialog/CreateClassdialog';
import PopupMenuItem from '../PopupMenu/PopupMenuItem';
import LogoutDialog from '../Dialog/LogoutDialog';

const ClassroomAppBar: React.FC = () => {
  const auth = useSelector((state:AppState)=>state.auth.user);
  
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
            <Typography variant="h6" component="div">
                Classroom
            </Typography>
            
            <Tabs value={tabValue} onChange={handleChange} aria-label="classroom-tabs" centered sx={{flexGrow: 1}}>
                <Tab label="News"/>
                <Tab label="Assignments"/>
                <Tab label="Participants"/>
            </Tabs>

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

export default ClassroomAppBar;