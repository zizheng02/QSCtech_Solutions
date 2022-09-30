import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider ,styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border:0,
    },
  }));
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  

export default function Lesson() {
  axios.defaults.withCredentials=true
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [rows,setRows]=useState([]);
  useEffect(()=>{
    axios.defaults.withCredentials=true 
    const cookie = localStorage.getItem('cookie');
    axios({
        method: 'get',
        url: 'http://localhost:9999/credit',
    }).then(res => {
            setRows(res.data.data);
        })
        .catch(err => {
            console.log('1')
        });
  },[]);

  const getCredit=(rows)=>{
    axios.defaults.withCredentials=true
    const cookie = localStorage.getItem('cookie');
    axios({
        method: 'get',
        url: 'http://localhost:9999/credit',
    }).then(res => {
        setRows(res.data.data);
    })
        .catch(err => {
            // alert('登录已过期~即将回到登陆页面');
            setInterval(handleOpen,3000);
            
            // window.location='http://localhost:3000/'as string&Location;
        });
  };
  const logOut=()=>{
    localStorage.removeItem('cookie');
    window.location='http://localhost:3000/'as string&Location;
  }

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  const tiaozhuan =()=>{
    localStorage.removeItem('cookie');
    window.location='http://localhost:3000/'as string&Location;
  }
    return (
      <React.Fragment>
        <Button onClick={tiaozhuan}>确定</Button>
      </React.Fragment>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Error!</h2>
          <p id="parent-modal-description">
           您的登录已过期~
          </p>
          <ChildModal />
        </Box>
      </Modal>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <CachedTwoToneIcon onClick={getCredit} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Credit Page
            </Typography>
            <Button 
            color="inherit"
            onClick={logOut}
            >Log Out</Button>
            </Toolbar>
        </AppBar>
        </Box>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>课程名称</StyledTableCell>
                <StyledTableCell align="right">绩点</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.credit}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </ThemeProvider>
  );
}
