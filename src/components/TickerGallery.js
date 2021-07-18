import { useState, useEffect } from "react";
import styled from "styled-components";
import Ticker from "./Ticker";
import AddTickerInputField from "./AddTickerInputField";

const MAX_ALLOWED_TICKERS = 16;
const PRICE_UPDATE_DELAY = 5000; // 5000 is 5 seconds
const DEBUG_USE_FAKE_PRICES = false;

function TickerGallery() {
  const [tickersArr, setTickersArr] = useState(getTickerObjects());

  const updatePrices = async () => {
    let arr = [...tickersArr];
    if (DEBUG_USE_FAKE_PRICES) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].prevPrice = tickersArr[i].currentPrice;
        arr[i].currentPrice = (Math.random() * 10).toFixed(6);
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        // Example URI: http://localhost:8080/stock/botz
        let res = await fetch(`http://localhost:8080/${arr[i].type}/${arr[i].tickerName}`);
        res = await res.json();
        if (res.day == null) console.log(res);
        arr[i].prevPrice = tickersArr[i].currentPrice;
        arr[i].currentPrice = res.currentPrice;
        arr[i].priceDifference = res.day?.priceDifference;
        arr[i].percentage = res.day?.percentage.toFixed(2);
      }
    }
    setTickersArr(arr);
  };

  const handleAddTicker = (tickerName, type) => {
    if (tickersArr.length >= MAX_ALLOWED_TICKERS) return;

    let arr = [...tickersArr];
    arr.push({ tickerName, type: type, currentPrice: 0, prevPrice: 0 });
    setTickersArr(arr);
  };

  useEffect(() => {
    updatePrices();

    // const interval = setInterval(() => {
    //   updatePrices();
    // }, PRICE_UPDATE_DELAY);
    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Container>
        <Head>Today | Week | Month | YTD | Year</Head>
        <GridContainer>
          {tickersArr.map((t, keyIndex) => (
            <Ticker
              key={keyIndex}
              tickerName={t.tickerName}
              type={t.type}
              price={t.currentPrice}
              prevPrice={t.prevPrice}
              priceDifference={t.priceDifference}
              percentage={t.percentage}
            />
          ))}
        </GridContainer>
        <AddTickerInputField handleAddTicker={handleAddTicker} />
      </Container>
    </>
  );
}

const Head = styled.div`
  display: flex;
  color: white;
  margin-left: 1rem;
`;

const Container = styled.div`
  width: min-content;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(4, auto);

  @media (max-width: 850px) {
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(3, auto);
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
  }
`;

function getTickerObjects() {
  return [
    {
      tickerName: "TWTR",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "AAPL",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "BOTZ",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "AMZN",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "BTC",
      type: "crypto",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "ETH",
      type: "crypto",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "DOGE",
      type: "crypto",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "YOLO",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "GOOGL",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "TSLA",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    // {
    //   tickerName: "VTSAX",
    //   type: "stock",
    //   currentPrice: 0,
    //   prevPrice: 0,
    //   priceDifference: 0,
    //   percentage: 0.0,
    // },
    {
      tickerName: "UBER",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
    {
      tickerName: "LYFT",
      type: "stock",
      currentPrice: 0,
      prevPrice: 0,
      priceDifference: 0,
      percentage: 0.0,
    },
  ];
}

export default TickerGallery;
