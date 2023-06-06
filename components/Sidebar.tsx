import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import {
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineStar,
} from "react-icons/ai";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { BsCurrencyBitcoin } from "react-icons/bs";
import {
  transactionAmount,
  calculateAllChange,
  getTotalTransactionsAmount,
  formattedPrice,
  calculateGreet,
} from "@/utils/format";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

import { errorToastOptions, toastOptions } from "@/utils/hot-toast";
import useWebSockets from "@/hooks/useWebSockets";
import { Currencies } from "@/typings";

// interface Props{
//   currncies: Currencies
// }

export default function Sidebar({ currencies }: any) {
  // console.log(currencies);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();
  const links = {
    crypto: <BsCurrencyBitcoin className="link-icon" />,
    wishlist: <AiOutlineStar className="link-icon" />,
    profile: <AiOutlineUser className="link-icon" />,
    settings: <IoSettingsOutline className="link-icon" />,
  };
  if (!user) return <div>Loading</div>;

  const goToLogin = () => router.push("/login");

  const onLogout = () => {
    logout();
    toast(`Bye`, toastOptions);
  };

  const { totalUpdatedAmount, totalGain, totalUpdatedChange } =
    calculateAllChange(
      user?.currencies,
      currencies,
      getTotalTransactionsAmount(user.transactions)
    );

  return (
    <section className={`sidebar-section ${isSidebarOpen ? "closed" : ""}`}>
      <div className="upper-container">
        <div className="logo-container">
          <img src="/logo1.png" className="logo" alt="" />
        </div>
        <div className="sidebar">
          <nav className="sidebar-nav">
            {Object.keys(links).map((link) => (
              <Link
                href={"/" + link}
                className={`sidebar-nav-link ${
                  router.pathname.includes(link) && "active"
                }`}
              >
                {links[link as keyof typeof links]}
                <span>{link}</span>
              </Link>
            ))}
          </nav>
        </div>
        {totalUpdatedChange ? (
          <div className="portfolio-section align-center">
            <div className="portfolio flex align-center">
              <img className="portfolio-img" src="/portfolio.png" alt="" />
              <h1>My Portfolio: </h1>
            </div>
            <h1
              className={
                totalGain > 0
                  ? "portfolio-worth ascending"
                  : "portfolio-worth descending"
              }
            >
              {formattedPrice(totalUpdatedAmount)}
            </h1>
            <h2>
              <span
                className={
                  totalGain > 0
                    ? "portfolio-change ascending"
                    : "portfolio-change descending"
                }
              >
                {totalUpdatedChange.toFixed(2) + "%"}
              </span>
            </h2>

            <h1>Current balance: ${user?.coins}</h1>
          </div>
        ) : (
          <img className="loader-s" src="/loader1.gif" alt="" />
        )}
      </div>
      {user ? (
        <div className="">
          <div className="user-container">
            <p>Welcome back,</p>
            <p className="username">{user?.fullName}.</p>
            <button onClick={onLogout}>Logout</button>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="user-container">
          <button onClick={goToLogin}>Login</button>
        </div>
      )}
    </section>
  );
}
