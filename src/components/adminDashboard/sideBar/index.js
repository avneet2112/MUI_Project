import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';

import { drawerContent } from '../../../constants/drawerContent';
import Divider from '@mui/material/Divider';
const SideBar = ({ setIsActiveContent }) => {
  return (
    <Drawer
      sx={{
        width: 180,
      }}
      variant='persistent'
      ModalProps={{
        keepMounted: true,
      }}
      anchor={'left'}
      open
    >
      <List>
        {drawerContent.map((content, index) => (
          <>
            <ListItem key={content.text} disablePadding>
              <ListItemButton onClick={() => setIsActiveContent(index)}>
                <ListItemIcon>{content.drawerIcon}</ListItemIcon>
                <ListItemText primary={content.text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
