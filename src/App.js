// import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { adminDetails } from './constants';
import AdminDashboard from './components/adminDashboard';
const theme = createTheme({
  palette: {
    success: {
      main: '#8A4FFF',
    },
    warning: {
      main: '#FFD700',
    },
  },
  typography: {
    fontFamily: 'Inter',
  },
});
function App() {
  useEffect(() => {
    localStorage.setItem('adminDetails', JSON.stringify(adminDetails));
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<AdminDashboard />}></Route>
          {/* <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/contact' element={<Contact />}></Route> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
