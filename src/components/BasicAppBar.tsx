import React from 'react';
import {AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, Avatar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ClassCreateButton from './ClassCreateButton';
import { BasicAppBarProps } from '@/@types/props';

const BasicAppBar: React.FC<BasicAppBarProps> = ({auth, onClassPreCreate, onClassPostCreate}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Classroom
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <AddIcon />
          </IconButton>
          <Menu
            id="classroom-menu"
            aria-labelledby="classroom-menu"
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <ClassCreateButton 
              onPreCreate={onClassPreCreate}
              onPostCreate={onClassPostCreate}
              onMenuItemClick={handleClose}
            />
          </Menu>
            {auth?(<Avatar sx={{ bgcolor: 'rgba(0, 128, 0, 0.3)' }}>{auth.name.slice(0,2)}</Avatar>):(<Button color="inherit">Login</Button>)}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default BasicAppBar;