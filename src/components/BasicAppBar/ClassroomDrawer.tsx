import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';

import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton} from '@mui/material';
import DrawerItem from './DrawerItem';
import useClassroomFilter from '@/hooks/useClassroomFilter';



const ClassroomDrawer = () => {
  const [left, setLeft] = React.useState(false);
  const {study, teach} = useClassroomFilter();
 

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

    setLeft(open);
  };

  return (
    <div>
       <IconButton onClick={toggleDrawer(true)}><MenuIcon sx={{color: 'black'}} fontSize="medium" /></IconButton>
        <Drawer
          anchor={'left'}
          open={left}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width:  250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, true)}
            // onKeyDown={toggleDrawer(anchor, false)}
          >
            <List>
              <DrawerItem title="Teach" toggleDrawer={toggleDrawer(false)} items={teach} key={0}/>
              <Divider key={1}/>
              <DrawerItem title="Study" toggleDrawer={toggleDrawer(false)} items={study} key={2}/>
            </List>
          </Box>
        </Drawer>
    </div>
  );
}

export default ClassroomDrawer;