import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Collapse, IconButton } from '@mui/material';
import { AppRegistrationOutlined, CreateOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function ClassroomDrawer() {
  const [left, setLeft] = React.useState(
    {left:false});
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setLeft({ ...left, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width:  250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Create', 'Resigter'].map((text, index) => (
          <>
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <CreateOutlined /> : <AppRegistrationOutlined />}
            </ListItemIcon>
            <ListItemText primary={text} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem><Divider />
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
          </>
        ))}
      </List>
      
      
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
        <IconButton onClick={toggleDrawer(anchor, true)}><SchoolOutlinedIcon sx={{color: 'black'}} fontSize="large" /></IconButton>
        <Drawer
          anchor={anchor}
          open={left[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      ))}
    </div>
  );
}
