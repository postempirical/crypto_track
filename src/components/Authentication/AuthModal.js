import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { Button, Modal, Box, Tabs, Tab, AppBar, Backdrop, Fade } from '@mui/material';
import { auth } from '../../firebase';
import Signup from "./Signup";
import Login from "./Login";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';

export default function AuthModal() {
    const [open, setOpen] = useState(false);
    const { setAlert } = CryptoState();
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const googleProvider = new GoogleAuthProvider();
  
    // const signInWithGoogle = () => {
    //   signInWithPopup(auth, googleProvider)
    //     .then((res) => {
    //       setAlert({
    //         open: true,
    //         message: `Sign Up Successful. Welcome ${res.user.email}`,
    //         type: "success",
    //       });
  
    //       handleClose();
    //     })
    //     .catch((error) => {
    //       setAlert({
    //         open: true,
    //         message: error.message,
    //         type: "error",
    //       });
    //       return;
    //     });
    // };
  
    return (
      <div>
        <Button
          variant="contained"
          style={{
            width: 85,
            height: 40,
            marginLeft: 15,
            backgroundColor: "#EEBC1D",
          }}
          onClick={handleOpen}
        >
          Login
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          sx={{display: "flex", alignItems: "center", justifyContent: "center",}}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={{width: 400, backgroundColor: {/*theme.palette.background.paper*/}, color: "white", borderRadius: 10,}}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{ borderRadius: 10 }}
                >
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
                </Tabs>
              </AppBar>
              {value === 0 && <Login handleClose={handleClose} />}
              {value === 1 && <Signup handleClose={handleClose} />}
                <span>OR</span>
                {/* <GoogleButton
                  style={{ width: "100%", outline: "none" }}
                  onClick={signInWithGoogle}
                /> */}
            </Box>
          </Fade>
        </Modal>
      </div>
    );
}
