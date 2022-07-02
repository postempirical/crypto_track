import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { SingleCoin } from '../config/api'
import { Box, createTheme } from '@mui/system'
import Coininfo from '../components/CoinInfo'
import { Typography } from '@mui/material'
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Banner/Carousel'
import { LinearProgress } from '@mui/material'
import { useTheme } from '@emotion/react'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from '@mui/material'

export default function CoinPage() {
  const { id } = useParams()
  const[ coin, setCoin] = useState()
  const {currency, symbol, user, setAlert, watchlist, coins} = CryptoState()
  const { breakpoints } = useTheme()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
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

  const removeFromWatchlist = async () => {
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
  
  useEffect(() => {
    fetchCoin()
  }, [])

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box sx={{display: "flex",flexDirection:{xs:"column", sm:"column" ,md: "column", lg:"row"}, alignItems:{md: "center"},
  }}>
      <Box sx={{width: "30%", width:{md: "100%", lg: "30%"},
      // [theme.breakpoints.down("md")]: {
      //   width: "100%",
      // },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",}}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={{fontWeight: "bold",marginBottom: 5,fontFamily: "Montserrat",}}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{width: "100%", fontFamily: "Montserrat", padding: 5, paddingBottom: 5, paddingTop: 0, textAlign: "justify",}}>
          {(coin?.description.en.split(". ")[0])}.
        </Typography>
        <Box sx={{alignSelf: "start", padding: 5, paddingTop: 1, width: "100%", display:{md: "flex"}, justifyContent:{md: "space-around"}, alignItems:{sm: "center",md: "start"}, flexDirection:{sm: "column"},}}>
        <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{fontWeight: "bold", marginBottom: 2, fontFamily: "Montserrat",}}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{fontWeight: "bold", marginBottom: 2, fontFamily: "Montserrat",}}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{fontWeight: "bold", marginBottom: 2, fontFamily: "Montserrat",}}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                color: "black",
                fontWeight: "bold",
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }} 
              onClick={inWatchlist ? removeFromWatchlist :addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </Box>
      </Box>
      <Coininfo coin = { coin }/>
    </Box>
  )
}
