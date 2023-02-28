import HotCryptoPreview from './HotCryptoPreview';

export default function HotCryptoList({ hotList }: any) {
    return (
        <div className="hot-crypto-list flex">
            {hotList.map((crypto: any) => (
                <HotCryptoPreview crypto={crypto} />
            ))}
        </div>
    );
}
