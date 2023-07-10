import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const CloseConfirmationModal = ({ handleResponse }) => {
  return (
    <>
      <Modal open={true} closeAfterTransition>
        <Fade in={true}>
          <Box sx={style}>
            <Typography variant='h5'>
              Do you want to close the form Modal?
            </Typography>
            <Button color='error' onClick={() => handleResponse(true)}>
              Yes
            </Button>
            <Button color='primary' onClick={() => handleResponse(false)}>
              No
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CloseConfirmationModal;
