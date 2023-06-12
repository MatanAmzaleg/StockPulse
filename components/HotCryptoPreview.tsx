import Image from "next/image";
import Link from "next/link";
import { Currency } from "@/typings";
import { formattedPrice } from "../utils/format";
import HotSkeleton from "./skeleton/HotSkeleton";
import { useEffect, useRef, useState } from "react";
import checkAuth from "@/hooks/useAuth";
import { Star } from "./Star";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

interface Props {
  crypto: Currency;
}

export default function HotCryptoPreview({ crypto }: Props) {
  const graphRef = useRef(null);
  const [isOnWatchlist, setIsOnWatchlist] = useState<boolean>(false);
  const [watchlist, setWatchList] = useState<string[]>([]);
  const { addToWatchList, user } = checkAuth();
  const [prevPrice, setPrevPrice] = useState(crypto?.bp);
  const [color, setColor] = useState("");
  

  useEffect(() => {
    if (!user || user.watchlist?.length === 0 || !crypto) return;
    setIsOnWatchlist(user.watchlist.includes(crypto.S));
  }, [crypto]);


  useEffect(() => {
    if(prevPrice > crypto?.bp) setColor("descending");
    if(prevPrice < crypto?.bp) setColor("ascending");
    setPrevPrice(crypto?.bp);
  }, [crypto?.bp]);


  useEffect(() => {
    if (color) {
      const timeout = setTimeout(() => {
        setColor("");
      }, 700);
  
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [color]);


  useEffect(() => {
const watchlistCurrencies = user?.watchlist.map((currency) => currency);
    setWatchList(watchlistCurrencies !);
  },[user])

  const onToggleWatchlist = async (event: React.MouseEvent) => {
    event.preventDefault();
    const res = await addToWatchList(crypto.S);
    setIsOnWatchlist(res.isOnWatchlist);
  };


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

          <button onClick={(e) => onToggleWatchlist(e)}>
            {watchlist?.includes(crypto.S) ? (
              <AiFillStar className="opt-icon" />
            ) : (
              <AiOutlineStar className="opt-icon" />
            )}
          </button>
        </div>
        <div className="bottom-sec flex space-between align-center">
          <div className="graph" ref={graphRef}></div>
          <div className="">
            <h2 className={`price-title ${color}`}>{formattedPrice(crypto.bp)}</h2>
          </div>
        </div>
      </article>
    </Link>
  );
}