import HotCryptoPreview from "@/components/HotCryptoPreview";
import useAuth from "@/hooks/useAuth";
import useWebSockets from "@/hooks/useWebSockets";
import { Currency } from "@/typings";
import { useRouter } from "next/router";



export default function Wishlist() {
    const { user } = useAuth();
    const router = useRouter();

    const watchlistCurrencies = user?.watchlist.map((currency)=> {
        return currency?.S.toUpperCase()
    })
    const { currencies } = useWebSockets(user?.watchlist!);

    console.log(currencies);
    


    if(!user) router.push('/login');

    return (
        <section className="wishlist-sec">
           <h1 className="main-title">Stock Market</h1>
            <p className="subtitle">Trending market group</p>

            <section className="hot-crypto-sec">
                <h1>Hot 🔥</h1>
                <section className="hot-crypto-list flex wrap">
                    {user?.watchlist.map((currency, idx) => (
                        <HotCryptoPreview
                            key={currency}
                            crypto= {currencies[currency as keyof typeof currencies]!}
                        />
                    ))}
                </section>
            </section>
        </section>
    );
}


