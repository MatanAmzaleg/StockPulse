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

export interface Currencies {
    BTCUSD?: Currency;
    ETHUSD?: Currency;
    DOGEUSD?: Currency;
}
