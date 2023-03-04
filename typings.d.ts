import { Timestamp } from "mongodb";

export interface Currency {
    name: string;
    T: string;
    S: string;
    ap: number;
    as: number;
    bp: number;
    bs: number;
    t: string;
    x: string;
}

export interface CurrencyData {
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: number;
    v: number;
    vw: number;
}

export interface Currencies {
    BTCUSD?: Currency;
    ETHUSD?: Currency;
    DOGEUSD?: Currency;
    USDTUSD?: Currency;
    YFIUSD?: Currency;
    SUSHIUSD?: Currency;
    SOLUSD?: Currency;
    UNIUSD?: Currency;
}
export interface Transaction {
    symbol: String;
    date: Number;
    status: String;
    quantity: Number;
    buyPrice: Number;
}
