import React from 'react'
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from '../Banner/Carousel';
import { doc, setDoc } from "firebase/firestore";
import { Drawer, Avatar, Button } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { Box } from '@mui/system';
import { AiFillDelete } from "react-icons/ai";

const style_container = {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
    justifyContent: "center"
}

const style_logout = {
    height: "30%",
    Width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
}

const style_picture = {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
}

const style_watchlist = {
    // flex: 1,
    // width: "100%",
    backgroundColor: "grey",
    padding: 15,
    paddingTop: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    overflowY: "scroll",
    border: "2px solid green",
    marginTop: 5
}

const style_coin = {
    padding: 2,
    borderRadius: 2,
    color: "black",
    // width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",

}

const style_profile = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    // height: "92%",
}

function UserSidebar() {
    const [state, setState] = React.useState({
      right: false,
    });
    const { user, setAlert, watchlist, coins, symbol } = CryptoState();
    
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const logOut = () => {
      signOut(auth);
      setAlert({
        open: true,
        type: "success",
        message: "Logout Successfull !",
      });
  
      toggleDrawer();
    };
  
    const removeFromWatchlist = async (coin) => {
      const coinRef = doc(db, "watchlist", user.uid);
      try {
        await setDoc(
          coinRef,
          { coins: watchlist.filter((wish) => wish !== coin?.id) },
          { merge: true }
        );
  
        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist !`,
          type: "success",
        });
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    };
  
    return (
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Avatar
              onClick={toggleDrawer(anchor, true)}
              style={{
                height: 38,
                width: 38,
                marginLeft: 15,
                cursor: "pointer",
                backgroundColor: "#EEBC1D",
              }}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <Box sx={{...style_container}}>
                <Box sx={{...style_profile}}>
                  <Avatar
                    sx={{...style_picture}}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                  <span
                    style={{
                      width: "100%",
                      fontSize:20,
                      textAlign: "center",
                      fontWeight: "bolder",
                    //   wordWrap: "break-word",
                        marginRight: 205,
                    }}
                  >
                    {user.displayName || user.email}
                  </span>
                  
                  <Box sx={{...style_watchlist, }}>
                    <span style={{ fontSize: 35, margin: 0,textShadow: "0 0 5px black",}}>
                      Watchlist
                    </span>
                    {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <Box sx={{...style_coin,}}>
                          <span style={{fontWeight: "bolder", fontSize: 20}}>{coin.name}</span>
                          <span style={{ display: "flex", gap: 4 }}>
                            {/* {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))} */}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </Box>
                      );
                    else return <></>;
                  })}
                  </Box>
                </Box>
                <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",}}>
                <Button
                  variant="contained"
                  sx={{...style_logout}}
                  onClick={logOut}
                >
                  Log Out
                </Button>
                </Box>
               
              </Box>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
}

export default UserSidebar