import CryptoCard from "@/components/CryptoCard";
import TransactionPreview from "@/components/TransactionPreview";
import useAuth from "@/hooks/useAuth";
import useWebSockets from "@/hooks/useWebSockets";
import { Transaction } from "@/typings";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function profile() {
  // const transactions = [
  //     {
  //         // email: 'Guy@gmail.com',
  //         action: 'buy',
  //         symbol: 'btc',
  //         symbolName: 'Bitcoin',
  //         date: 126319289,
  //         status: 'approved',
  //         amount: 1723,
  //         price: 300,
  //     },
  //     {
  //         // email: 'Guy@gmail.com',
  //         action: 'sell',
  //         symbol: 'btc',
  //         symbolName: 'Bitcoin',
  //         date: 126334289,
  //         status: 'approved',
  //         amount: 1723,
  //         price: 300,
  //     },
  //     {
  //         // email: 'Guy@gmail.com',
  //         action: 'buy',
  //         symbol: 'btc',
  //         symbolName: 'Bitcoin',
  //         date: 1241219289,
  //         status: 'pending',
  //         amount: 1723,
  //         price: 300,
  //     },
  // ];

  // const userCurrencies = [
  //     {
  //         symbol: 'btc',
  //         symbolName: 'bitcoin',
  //         amount: 1.23,
  //     },
  //     {
  //         symbol: 'eth',
  //         symbolName: 'ethereium',
  //         amount: 123,
  //     },
  //     {
  //         symbol: 'sushi',
  //         symbolName: 'Sushi',
  //         amount: 5322,
  //     },
  //     // {
  //     //     symbol: 'sushi',
  //     //     symbolName: 'Sushi',
  //     //     amount: 5322,
  //     // },
  //     // {
  //     //     symbol: 'sushi',
  //     //     symbolName: 'Sushi',
  //     //     amount: 5322,
  //     // },
  // ];

  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //     if (!getCookie('loggedInUser')) router.push('login');
  // }, [user]);

  if (!user) return <div>Loading</div>;

  const { currencies } = useWebSockets(
    user!.currencies.map((c) => (c.currency + "usd").toLocaleUpperCase())
  );

  return (
    <section className="profile-section">
      <header className="profile-header">
        <div className="profile-user">
          <p className="greet">Good Morning</p>
          <h1>Welcom Back, {user?.fullName}</h1>
        </div>
        <div className="user-balance">
          <h1>{user?.coins}$ PulseCoins</h1>
          <p>Current balance</p>
        </div>
      </header>
      <div className="profile-grid">
        <div className="card crypto-portfolio flex column space-between">
          <h1 className="bolder"> My Crypto portfolio:</h1>
          <h1 className="portfolio-worth">1342.15$</h1>
          <h2>
            Change: <span className="scending">14.75% | 150$</span>{" "}
          </h2>
        </div>
        <div className="card my-cryptos flex column">
          <h1>Wallet</h1>
          <section className="header flex space-between">
              <div className="flex align-center">
                <p className="bolder">Currency</p>
              </div>
              <p>Amount</p>
              <p>USD worth</p>
              <p className="scending">Change</p>
            </section>
          <div className="cryptos flex column">
            {user!.currencies.map((c) => (
              <CryptoCard
                price={
                  currencies[
                    (
                      c.currency + "USD"
                    ).toLocaleUpperCase() as keyof typeof currencies
                  ]?.bp
                }
                key={c.currency}
                currency={c}
              />
            ))}
          </div>
        </div>
        <div className="card transaction-container flex column">
          <h1>Transacrion History</h1>
          <div className="transaction-preview heading">
            <p>Currency</p>
            <p>Action</p>
            <p>Date</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Status</p>
          </div>
          <div className="transaction-list">
            {user!.transactions.map((t: Transaction) => (
              <TransactionPreview key={t.date} transaction={t} />
            ))}
            {/* {transactions.map((t: Transaction) => (
                            <TransactionPreview key={t.date} transaction={t} />
                        ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  console.log("hello", req.headers.cookie);
  if (!req.headers.cookie?.includes("loggedInUser")) {
    console.log("goodbye", req.headers.cookie);

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: "" },
  };
};
