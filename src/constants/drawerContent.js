import DashboardIcon from '@mui/icons-material/Dashboard';
import Dashboard from '../components/adminDashboard/dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import { getAllEmployees } from '.';
import ShowChart from '../components/ShowChart';
export const drawerContent = [
  {
    drawerIcon: <DashboardIcon />,
    text: 'Dashboard',
    content: <Dashboard />,
  },
  {
    drawerIcon: <PieChartIcon />,
    text: 'Pie Chart',
    content: <ShowChart getAllEmployees={getAllEmployees} />,
  },
];
