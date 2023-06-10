import Image from "next/image";
import { Currency } from "@/typings";
import { formattedPrice } from "../utils/format";
import Link from "next/link";
import PopularSkeleton from "./skeleton/PopularSkeleton";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";

interface Props {
  crypto: Currency;
}

export default function PopularCryptoPreview({ crypto }: Props) {

    const graphRef = useRef(null);
    const [isOnWatchlist, setIsOnWatchlist] = useState<boolean>(false);
    const [watchlist, setWatchList] = useState<string[]>([]);
    const { addToWatchList, user } = useAuth();
    const [prevPrice, setPrevPrice] = useState(crypto?.bp);
    const [color, setColor] = useState("");
  
    useEffect(() => {
      if (!user || user.watchlist?.length === 0 || !crypto) return;
      setIsOnWatchlist(user.watchlist.includes(crypto.S));
      
    }, [crypto]);

    useEffect(() => {
      console.log(prevPrice);
      
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
  console.log("ser changed");
  const watchlistCurrencies = user?.watchlist.map((currency) => currency);
      setWatchList(watchlistCurrencies !);
    },[user])


    const onToggleWatchlist = async (event: React.MouseEvent) => {
        event.preventDefault();
        const res = await addToWatchList(crypto.S);
           setIsOnWatchlist(res.isOnWatchlist);
      };



  if (!crypto) return <PopularSkeleton />;

  return (
    <Link
      className="popular-crypto-preview flex column space-between"
      href={`/crypto/${crypto.S}`}
    >
      <div>
        <Image
          src={`/${crypto.S}.svg`}
          alt={crypto.S}
          className="icon-img"
          width={45}
          height={45}
        />
        <button onClick={(e) => onToggleWatchlist(e)}>
          {watchlist?.includes(crypto.S) ? (
            <AiFillStar className="opt-icon" />
          ) : (
            <AiOutlineStar className="opt-icon" />
          )}
        </button>
      </div>
      <div className="title-sec flex ">
        <h1 className="stock-title">{crypto?.S}</h1>
        <p className="stock-subtitle">{crypto?.name || "crypto"}</p>
      </div>
      <h1 className={`price-title ${color}`}>{formattedPrice(crypto?.bp)}</h1>
    </Link>
  );
}
