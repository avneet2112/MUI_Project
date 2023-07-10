import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { drawerContent } from '../../constants/drawerContent';
import Dashboard from './dashboard';
import SideBar from './sideBar';

const AdminDashboard = () => {
  const [isActiveContent, setIsActiveContent] = useState(0);
  function displayContent() {
    return drawerContent[isActiveContent].content;
  }
  return (
    <Box sx={{ display: 'flex' }} mx={{ width: '-webkit-fill-available' }}>
      <SideBar setIsActiveContent={setIsActiveContent} />
      {displayContent()}
    </Box>
  );
};

export default AdminDashboard;
