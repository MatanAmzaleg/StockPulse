import axios from "axios";
import {
  dateTimeFormat,
  formattedPrice,
  formmatedDate,
  calculateChange,
} from "@/utils/format";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getCryptoCompareUrl, getCurrencyDataURL } from "@/utils/requests";
import Image from "next/image";
import { useRouter } from "next/router";
import useWebSockets from "@/hooks/useWebSockets";
import useAuth from "@/hooks/useAuth";
import { AiOutlineStar } from "react-icons/ai";
import { createCandleStickChart } from "@/services/front/ChartService";
import { userService } from "@/services/front/UserService";
import { CryptoDetailsSkeleton } from "@/components/skeleton/CryptoDetailsSkeleton";
import { toast } from "react-hot-toast";
import { errorToastOptions, toastOptions } from "@/utils/hot-toast";

interface Props {
  data: any;
  yesterdayData: any;
  chartData: any;
  currencies: any;
}

export default function CryptoDetails({
  data,
  yesterdayData,
  chartData,
  currencies,
}: Props) {
  const router = useRouter();
  const { symbol } = router.query;
  const graphRef = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState("today");
  const [inputValue, setInputValue] = useState<number>(0);
  const [usdInCrypto, setUsdInCrypto] = useState<number>(0);
  const { user } = useAuth();
  const [oc, setOc] = useState({ open: data.o, close: data.c, ts: data.t });
  
  const currency = currencies[symbol?.toUpperCase() + "USD"];
  console.log(currency);
  const [prevPrice, setPrevPrice] = useState([currency?.bp]);
  const [color, setColor] = useState()

  useEffect(() => {
    if (!graphRef.current) return;
    createCandleStickChart(graphRef.current!, chartData);
  }, []);

  useEffect(() => {
    if (prevPrice.length > 1) prevPrice.push(currency?.bp);
    // console.log(prevPrice);
  }, [currency?.bp]);

  const selectDay = (day: string) => {
    setDay(day);
    const { o, c, t } = day === "today" ? data : yesterdayData;
    setOc({ open: o, close: c, ts: t });
  };

  const changeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(target.value));
    setUsdInCrypto(parseFloat(target.value || "0") / currency!.bp);
  };

  const handleTransaction = async (action: string) => {
    if (!user) return toast("please login first", errorToastOptions);

    if (action === "buy" && inputValue > user.coins)
      return toast("need more cash to preform action", errorToastOptions);

    try {
      const res = await userService.handleTransaction(
        user.email,
        inputValue,
        action,
        currency?.ap!,
        currency?.S!
      );
      if (res?.data.message === "not enough cash") {
        toast(`Not enough ${currency?.S} to preform action`, errorToastOptions);
        setInputValue(0);
        return;
      } else if (res?.data.message === "selled succesfully") {
        toast(
          `$${inputValue} Worth ${currency?.S.toLocaleUpperCase()} has been selled successfully.`,
          toastOptions
        );
        setInputValue(0);
        return;
      }
      // alert(res!.data.message);
      toast(
        `$${inputValue} Worth ${currency?.S.toLocaleUpperCase()} has been purchased successfully.`,
        toastOptions
      );
      setInputValue(0);
    } catch (err) {
      console.log("failed to set transaction", err);
      toast("Failed to purchase", errorToastOptions);
    }
  };

  if (!currencies || !yesterdayData) return <CryptoDetailsSkeleton />;

  if (!currency) return <CryptoDetailsSkeleton />;

  const { percentage, orderType } = calculateChange(data.o, currency?.ap);

  return (
    <section className="crypto-details">
      <div className="logo">
        <div className="flex">
          <Image
            src={`/${symbol}.svg`}
            alt="apple"
            className="icon-img"
            width={50}
            height={50}
          />
          <h2>{currency?.name}</h2>
        </div>
        <button>
          <AiOutlineStar className="star-icon" />
        </button>
      </div>
      <div className="main-grid">
        <div className="card small-detaills">
          <p className="symbol">{currency?.S}</p>
          <h3 className="price">{formattedPrice(currency!.bp)}</h3>
          <div className="">
            <div className="percentage-container">
              <Image
                src={`/${orderType}.svg`}
                alt={orderType}
                className={`arrow-img ${orderType}`}
                width={20}
                height={20}
              ></Image>
              <p className={orderType}>{percentage}</p>
            </div>
          </div>
        </div>
        <div className="card open-close">
          <div className="day-actions">
            <button
              onClick={() => selectDay("today")}
              className={day === "today" ? "active" : ""}
            >
              Today
            </button>
            {/* <span className="curve"></span> */}
            <button
              onClick={() => selectDay("yesterday")}
              className={day === "yesterday" ? "active" : ""}
            >
              Yesterday
            </button>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Pre-Market</th>
                <th>Prev-Close</th>
                <th>Open</th>
              </tr>
              <tr>
                <td className="table-price">$130.00</td>
                <td className="table-price">{formattedPrice(oc.close)}</td>
                <td className="table-price">{formattedPrice(oc.open)}</td>
              </tr>
              <tr>
                <td className="percentage-container">
                  <Image
                    src={`/descending.svg`}
                    alt="descending"
                    className="arrow-img descending"
                    width={20}
                    height={20}
                  ></Image>
                  <p className="percentage descending ">-0.98</p>
                </td>
                <td className="table-date">
                  {dateTimeFormat(new Date(oc.ts))}
                </td>
                <td className="table-date">June 16, 4:00pm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card graph" ref={graphRef}>
          {!graphRef.current ? (
            <img className="photo" src="/loader1.gif" alt="" />
          ) : null}
        </div>

        <div className="card details">
          <h4>Details</h4>
          <div className="details-grid">
            {/* <span>Days Range</span>
                        <p>128.46 - 130px</p> */}
            <span>Weighted Average</span>
            <p>{formattedPrice(data.vw)}</p>
            <span>Volume</span>
            <p>{data.v.toFixed(2)}</p>
            <span>High</span>
            <p>{formattedPrice(data.h)}</p>
            <span>Low</span>
            <p>{formattedPrice(data.l)}</p>
            <span>Total Transactions</span>
            <p>{data.n.toFixed(2)}</p>
          </div>
        </div>
        <div className="card actions flex column">
          <div className="flex align-center">
            <p>~ {usdInCrypto.toFixed(9) || 0}</p>
            <img className="symbol-img" src={`/${symbol}.svg`} alt="" />
          </div>

          <input
            type="number"
            min={0}
            className="transaction-input"
            title="USD"
            onChange={changeInput}
            placeholder="$"
            value={inputValue || ""}
          />
          <div className="action-btns flex">
            <button className="buy" onClick={() => handleTransaction("buy")}>
              Buy
            </button>
            <button className="sell" onClick={() => handleTransaction("sell")}>
              Sell
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async ({ params }: { params: any }) => {
  const { symbol } = params;
  try {
    const todayFormat = formmatedDate(new Date());
    const yesterdayFormat = formmatedDate(new Date(Date.now() - 864e5));
    const dayBeforeLastFormat = formmatedDate(new Date(Date.now() - 864e5 * 2));

    const requests = [
      getCurrencyDataURL(symbol, todayFormat, yesterdayFormat),
      getCurrencyDataURL(symbol, yesterdayFormat, dayBeforeLastFormat),
      getCryptoCompareUrl(symbol),
    ];

    const [data, yesterdayData, chartData] = await Promise.all(
      requests.map((request) => axios.get(request).then((res) => res.data))
    );

    return {
      props: {
        data: data.results[0],
        yesterdayData: yesterdayData.results[0],
        chartData: chartData.Data.Data,
      },
    };
  } catch (error) {
    console.log("failed to fetch crypto details", error);
    return {
      props: {
        data: 0,
        yesterdayData: 0,
        chartData: 0,
      },
    };
  }
};
