import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import EmployeeForm from './employeeformModal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { employeeTableHeadings, getAllEmployees } from '../../constants';
import IconButton from '@mui/material/IconButton';
import DeleteMessage from './deleteConfirmationModal';
import dashboardStyles from '../../styles/dashboard';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import classNames from 'classnames';
const useStyles = makeStyles(dashboardStyles);
const Dashboard = () => {
  const classes = useStyles();
  const [cardData, setCardData] = useState([]);
  const [employeeForm, setEmployeeForm] = useState(false);
  const [employeeEditForm, setEmployeeEditForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [pageEmp, setPageEmp] = useState(0);
  const [rowsEmp, setRowsEmp] = useState(3);
  const [dataIndex, setDataIndex] = useState('');
  function handleDelete(feedback) {
    if (feedback) {
      let allData = getAllEmployees;
      allData.splice(dataIndex, 1);
      localStorage.setItem('getAllEmployees', JSON.stringify(allData));
    }
    setDeleteConfirmation(false);
  }
  useEffect(() => {
    setCardData([
      {
        icon: (
          <AccountBalanceWalletIcon
            className={classNames(classes.icon, classes.icon1)}
            style={{ fontSize: '70px' }}
          />
        ),
        label: 'Total Employees',
        total: getAllEmployees.length ? getAllEmployees.length : 0,
      },
      ,
      {
        icon: (
          <ManIcon
            className={classNames(classes.icon, classes.icon3)}
            style={{ fontSize: '70px' }}
          />
        ),
        label: 'Total Mens',
        total:
          getAllEmployees?.length > 0
            ? getAllEmployees.filter((res) => res.gender === 'Male').length
            : 0,
      },
      ,
      {
        icon: (
          <WomanIcon
            className={classNames(classes.icon, classes.icon4)}
            style={{ fontSize: '70px' }}
          />
        ),
        label: 'Total Womens',
        total:
          getAllEmployees?.length > 0
            ? getAllEmployees.filter((res) => res.gender === 'Female').length
            : 0,
      },
      {
        icon: (
          <img
            src='/india.png'
            className={classNames(classes.icon, classes.icon4)}
            style={{ height: 70, width: 70 }}
          />
        ),
        label: 'Total Indians',
        total:
          getAllEmployees?.length > 0
            ? getAllEmployees.filter((res) => res.country === 'India').length
            : 0,
      },
    ]);
  }, [employeeForm, deleteConfirmation]);
  return (
    <>
      {deleteConfirmation && (
        <DeleteMessage
          handleDelete={handleDelete}
          onClose={() => setDeleteConfirmation(false)}
          dataKey={dataIndex}
        />
      )}
      {(employeeForm || employeeEditForm) && (
        <EmployeeForm
          onClose={() => {
            setEmployeeForm(false);
            employeeEditForm && setEmployeeEditForm(false);
          }}
          isEdit={employeeEditForm}
          dataKey={dataIndex}
        />
      )}

      <Box className={classes.container}>
        <Typography className={classes.mainHeading}>
          Organization Data
        </Typography>
        <Grid container spacing={2}>
          {cardData.map((res) => (
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={4} className={classes.paperContent}>
                <Grid container alignContent={'center'}>
                  <Grid item>{res.icon}</Grid>
                  <Grid item className={classes.textsInPaper}>
                    <Typography>{res.label}</Typography>
                    <Typography>{res.total}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Box className={classes.actionButton}>
              <Button variant='contained' onClick={setEmployeeForm}>
                <PersonAddIcon fontSize='small' /> &nbsp; Add Employee
              </Button>
            </Box>
            <Paper elevation={3}>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={6}>Employees</TableCell>
                    </TableRow>
                    <TableRow>
                      {employeeTableHeadings.map((employee) => (
                        <TableCell key={employee.id}>
                          {employee.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getAllEmployees &&
                      getAllEmployees.length > 0 &&
                      getAllEmployees
                        .slice(pageEmp * rowsEmp, pageEmp * rowsEmp + rowsEmp)
                        .map((employee, ind) => (
                          <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.gender}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => {
                                  setEmployeeEditForm((prev) => !prev);
                                  setDataIndex(ind);
                                }}
                              >
                                <EditIcon color='warning' />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setDeleteConfirmation(true);
                                  setDataIndex(ind);
                                }}
                              >
                                <DeleteIcon color='error' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
                {getAllEmployees.length > 0 && (
                  <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component='div'
                    count={getAllEmployees?.length}
                    rowsPerPage={rowsEmp}
                    page={pageEmp}
                    onPageChange={(e, nextPage) => setPageEmp(nextPage)}
                    onRowsPerPageChange={(e) => {
                      console.log(e.target.value);
                      setRowsEmp(parseInt(e.target.value, 10));
                    }}
                  />
                )}
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
