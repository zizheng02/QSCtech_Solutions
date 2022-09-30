import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const theme = createTheme();
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SignIn() {
  axios.get('http://localhost:9999/login')
  .then(function (response) {
    window.location='http://localhost:3000/lesson'as string&Location;
  })
  const [open, setOpen] = React.useState(false);
  const [hyc,setHyc] = React.useState('');
  const handleOpen = () => {
    handleHello();
  };
  const handleClose = () => setOpen(false);
  // 允许携带cookie
  axios.defaults.withCredentials=true
  // 登录
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios({
      method: 'post',
      url: 'http://localhost:9999/login',
      data: {
        name:data.get('name'),
        id:parseInt(data.get('id') as string),
      },
      }).then(res => {
          const cookie = document.cookie;
          console.log(cookie);
          localStorage.setItem('cookie',cookie);
          window.location='http://localhost:3000/lesson'as string&Location;
      }).catch(err => {
          console.log(err)
      });
  };
  // 欢迎词
  function handleHello(){
    axios.get('http://localhost:9999/hello')
    .then(res => {
      setHyc(res.data.msg);
      setOpen(true);
      console.log(hyc);
    }).catch(err => {
      console.log(err);
    });}

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              求是潮查分助手
            </Typography>
            <Button 
            color="inherit"
            onClick={handleOpen}
            >点我试试~</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  欢迎使用求是潮~
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {hyc}
                </Typography>
              </Box>
            </Modal>
          </Toolbar>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ZJUer
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="id"
              label="ID"
              type="id"
              id="id"
              autoComplete="id"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}