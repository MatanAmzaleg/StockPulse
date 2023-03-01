import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineBarChart } from 'react-icons/ai';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { BsCurrencyBitcoin } from 'react-icons/bs';

export default function Sidebar() {
    return (
        <>
            <div className="logo-container">
                <div className="logo">stock pulse</div>
            </div>
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <Link href="/" className="sidebar-nav-link">
                        <BsCurrencyBitcoin className="link-icon" />
                        Crypto Currency
                    </Link>
                    <Link href="/" className="sidebar-nav-link">
                        <AiOutlineBarChart className="link-icon" />
                        Market
                    </Link>
                    <Link href="/" className="sidebar-nav-link">
                        <HiOutlineSquares2X2 className="link-icon" />
                        Dashboard
                    </Link>
                    <Link href="/" className="sidebar-nav-link">
                        <IoSettingsOutline className="link-icon" />
                        Setting
                    </Link>
                </nav>
            </div>
        </>
    );
}
