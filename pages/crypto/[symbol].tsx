import axios from 'axios';
import { dateTimeFormat, formattedPrice, formmatedDate } from '@/utils/format';
import { getCurrencyDataURL } from '@/utils/requests';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useWebSockets from '@/hooks/useWebSockets';

export default function CryptoDetails({ data }: any) {
    const router = useRouter();
    const { symbol } = router.query;

    const { currencies } = symbol
        ? useWebSockets([symbol as string])
        : { currencies: {} };

    console.log(data, currencies);
    console.log(dateTimeFormat(new Date(data.t)));

    if (!currencies) return <div className="">loading</div>;

    const alpacaCrypto = currencies[symbol as keyof typeof currencies];

    if (!alpacaCrypto) return <div className="">loading</div>;
    return (
        <section className="crypto-details">
            <div className="logo">
                <Image
                    src={`/${symbol}.svg`}
                    alt="apple"
                    className="icon-img"
                    width={50}
                    height={50}
                />
                <h2>Bitcoin</h2>
            </div>
            <div className="main-grid">
                <div className="card small-detaills">
                    <p className="symbol">{alpacaCrypto?.S}</p>
                    <h3 className="price">
                        {formattedPrice(alpacaCrypto!.bp)}
                    </h3>
                    <div className="">
                        <div className="percentage-container">
                            <Image
                                src={`/rising.svg`}
                                alt="rising"
                                className="arrow-img rising"
                                width={20}
                                height={20}
                            ></Image>
                            <p className="percentage rising ">+0.51 (+0.39%)</p>
                        </div>
                    </div>
                </div>
                <div className="card open-close">
                    <table>
                        <tr>
                            <th>Pre-Market</th>
                            <th>Close</th>
                            <th>Open</th>
                        </tr>
                        <tr>
                            <td className="table-price">$130.00</td>
                            <td className="table-price">
                                {formattedPrice(data.c)}
                            </td>
                            <td className="table-price">
                                {formattedPrice(data.o)}
                            </td>
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
                                {dateTimeFormat(new Date(data.t))}
                            </td>
                            <td className="table-date">June 16, 4:00pm</td>
                        </tr>
                    </table>
                </div>
                <div className="card graph">graph</div>
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
                <div className="card actions">
                    <button className="buy">Buy</button>
                    <button className="sell">Sell</button>
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps = async ({ params }: { params: any }) => {
    try {
        const todayFormat = formmatedDate(new Date());
        const yesterdayFormat = formmatedDate(new Date(Date.now() - 864e5));

        const response = await axios.get(
            getCurrencyDataURL(params.symbol, todayFormat, yesterdayFormat)
        );

        return {
            props: {
                data: response.data.results[0],
            },
        };
    } catch (err) {
        console.log('failed to fetch crypto details', err);
    }
};
