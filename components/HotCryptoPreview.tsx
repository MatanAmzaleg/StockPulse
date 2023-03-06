import Image from "next/image";
import Link from "next/link";
import { SlOptionsVertical } from "react-icons/sl";
import { Currency } from "@/typings";
import { formattedPrice } from "../utils/format";
import HotSkeleton from "./skeleton/HotSkeleton";
import { createChart, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";
import axios from "axios";

interface Props {
  crypto: Currency;
  currencyKey: String;
}

export default function HotCryptoPreview({ crypto, currencyKey }: Props) {
  const graphRef = useRef(null);

  useEffect(() => {
    const start = new Date(Date.now() - 3600 * 24 * 1000).toISOString();
    console.log(start);

    axios.get(`https://data.alpaca.markets/v1beta2/${currencyKey}/bars`, {
        params: {
          exchanges: "CBSE",
          timeframe: "1Min",
          start: "2023-03-04T18:37:16.506Z",
        },
        headers: {
          'APCA-API-KEY-ID': process.env.NEXT_PUBLIC_ALPACA_KEY,
          'APCA-API-SECRET-KEY': process.env.NEXT_PUBLIC_ALPACA_SECRET,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (graphRef.current) {
      const chart = createChart(graphRef.current!, {
        crosshair: {
          mode: CrosshairMode.Normal,
        },
      });
      const lineSeries = chart.addCandlestickSeries();
      lineSeries.setData([
        {
          time: "2018-10-19",
          open: 54.62,
          high: 55.5,
          low: 54.52,
          close: 54.9,
        },
        {
          time: "2018-10-22",
          open: 55.08,
          high: 55.27,
          low: 54.61,
          close: 54.98,
        },
        {
          time: "2018-10-23",
          open: 56.09,
          high: 57.47,
          low: 56.09,
          close: 57.21,
        },
        {
          time: "2018-10-24",
          open: 57.0,
          high: 58.44,
          low: 56.41,
          close: 57.42,
        },
        {
          time: "2018-10-25",
          open: 57.46,
          high: 57.63,
          low: 56.17,
          close: 56.43,
        },
        {
          time: "2018-10-26",
          open: 56.26,
          high: 56.62,
          low: 55.19,
          close: 55.51,
        },
        {
          time: "2018-10-29",
          open: 55.81,
          high: 57.15,
          low: 55.72,
          close: 56.48,
        },
        {
          time: "2018-10-30",
          open: 56.92,
          high: 58.8,
          low: 56.92,
          close: 58.18,
        },
        {
          time: "2018-10-31",
          open: 58.32,
          high: 58.32,
          low: 56.76,
          close: 57.09,
        },
        {
          time: "2018-11-01",
          open: 56.98,
          high: 57.28,
          low: 55.55,
          close: 56.05,
        },
        {
          time: "2018-11-02",
          open: 56.34,
          high: 57.08,
          low: 55.92,
          close: 56.63,
        },
      ]);
    }
  }, [graphRef.current]);

  if (!crypto) return <HotSkeleton />;

  return (
    <Link className="hot-crypto-preview" href={`/crypto/${crypto.S}`}>
      <article>
        <div className="upper-sec flex align-center">
          <Image
            src={`/${crypto.S}.svg`}
            alt="apple"
            className="icon-img"
            width={50}
            height={50}
          />
          <div className="title-sec flex column">
            <h2 className="stock-title">{crypto.S}</h2>
            <p className="stock-subtitle">{crypto.name || "coin"}</p>
          </div>
          <SlOptionsVertical className="opt-icon"></SlOptionsVertical>
        </div>
        <div className="bottom-sec flex space-between align-center">
          <div className="graph" ref={graphRef}></div>
          <div className="">
            <h2 className="price-title">{formattedPrice(crypto.bp)}</h2>
            <h3>{crypto.as?.toFixed(2)}%</h3>
          </div>
        </div>
      </article>
    </Link>
  );
}
