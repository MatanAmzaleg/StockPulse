import useWebSockets from '@/hooks/useWebSockets';
import { CurrencyData } from '@/typings';
import { useRouter } from 'next/router';
interface Props {
    currencyData: CurrencyData;
}

export default function CryptoDetails({ currencyData }: Props) {
    const router = useRouter();
    const { symbol } = router.query;

    const { currencies } = symbol
        ? useWebSockets([symbol as string])
        : { currencies: {} };

    console.log(currencyData, currencies);
    if (!currencies) return <div className="">loading</div>;

    const alpacaCrypto = currencies[symbol as keyof typeof currencies];
    return (
        <section className="crypto-details">
            <div className="logo">
                <img src="" alt="" />
                <h2>Bitcoin</h2>
            </div>
            <div className="main-grid">
                <div className="card small-detaills">
                    <p className="">{alpacaCrypto?.S}</p>
                    <h3 className="">{alpacaCrypto?.bp}</h3>
                    <span>0.51%</span>
                </div>
                <div className="card open-close">
                    <table>
                        <tr>
                            <th>Pre-Market</th>
                            <td>130$</td>
                            <td>-0.98</td>
                        </tr>
                        <tr>
                            <th>Close</th>
                            <td>{currencyData.c}</td>
                            <td>June 16, 4:00pm</td>
                        </tr>
                        <tr>
                            <th>Open</th>
                            <td>{currencyData.o}</td>
                            <td>June 16, 4:00pm</td>
                        </tr>
                    </table>
                </div>
                <div className="card graph">graph</div>
                <div className="card details">
                    <h4>Deatils</h4>
                    <span>Days Range</span>
                    <p>128.46 - 130px</p>
                    <span>Days Range</span>
                    <p>128.46 - 130px</p>
                    <span>Days Range</span>
                    <p>128.46 - 130px</p>
                    <span>Days Range</span>
                    <p>128.46 - 130px</p>
                    <span>Days Range</span>
                    <p>128.46 - 130px</p>
                    <span>Days Range</span>
                    <p>128.46 - 130px</p>
                </div>
                <div className="card actions">
                    <button>Buy</button>
                    <button>Sell</button>
                </div>
            </div>
        </section>
    );
}
