import { Timestamp } from 'mongodb';
import { UserDocument } from './model/user.schema';

export interface Currency {
    name: string;
    T: string;
    S: string;
    ap: number;
    as: number;
    bp: number;
    bs: number;
    s:number;
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
    id?: string;
    action: string;
    symbol: string;
    symbolName: string;
    date: number;
    status: string;
    amount: number;
    price: number;
}

export interface Crypto {
    currency: string;
    amount: number;
}

export interface CurrencyObjectMap {
    [key: string]: number;
}

export interface ModifyWatchlistObj {
    message: string;
    isOnWatchlist: boolean;
}
