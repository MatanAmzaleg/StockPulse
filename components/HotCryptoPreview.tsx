import { Currency } from '@/typings';
import { SlOptionsVertical } from 'react-icons/sl';

interface Props {
    crypto: Currency | null;
}

export default function HotCryptoPreview({ crypto }: Props) {
    return (
        <article className="hot-crypto-preview relative">
            <div className="options-btn">
                <SlOptionsVertical className="opt-icon"></SlOptionsVertical>
            </div>
            <div className="upper-sec flex align-center">
                <img className="icon-img" src="" alt="" />
                <div className="title-sec flex column">
                    <h2 className="stock-title">{crypto?.S}</h2>
                    <p className="stock-subtitle">{crypto?.name}</p>
                </div>
            </div>
            <div className="bottom-sec flex space-between align-center">
                <div className="graph"></div>
                <div className="">
                    <h2 className="price-title">{crypto?.bp?.toFixed(2)}$</h2>
                    <h3>{crypto?.as?.toFixed(2)}%</h3>
                </div>
            </div>
        </article>
    );
}
