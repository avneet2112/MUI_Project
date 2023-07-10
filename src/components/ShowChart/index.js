import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { gender } from '../../constants';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import chartStyles from '../../styles/chartStyle';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(chartStyles);
ChartJS.register(ArcElement, Tooltip, Legend);

const ShowChart = ({ getAllEmployees }) => {
  const classes = useStyles();
  const [data, setData] = useState({ label: [], datasets: [] });
  useEffect(() => {
    let genderD = gender.map(
      (gen) => getAllEmployees.filter((res) => res.gender === gen.label).length
    );

    setData({
      labels: gender.map((res) => res.label),
      datasets: [
        {
          label: 'Gender Count',
          data: genderD,
          backgroundColor: [
            'rgba(51, 214, 255, 0.8)',
            'rgba(0, 230, 172, 0.8)',
            'rgba(255, 230, 128, 0.8)',
          ],
          borderColor: [
            'rgba(0, 143, 179, 1)',
            'rgba(0, 102, 77, 1)',
            'rgba(255, 204, 0, 1)',
          ],
          borderWidth: 5,
        },
      ],
    });
  }, []);
  return (
    <Box className={classes.container}>
      <Typography className={classes.mainHeading}> Pie Chart</Typography>
      <br />
      <Paper
        elevation={3}
        className={classNames(classes.paddingContent, classes.borders)}
      >
        <Typography variant='h4' className={classes.heading}>
          Gender Ratio
        </Typography>
        <Doughnut data={data} className={classes.paddingChart} />
      </Paper>
    </Box>
  );
};

export default ShowChart;
