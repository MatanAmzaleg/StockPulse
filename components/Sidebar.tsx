import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineBarChart, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { BsCurrencyBitcoin } from 'react-icons/bs';

export default function Sidebar() {
    return (
        <>
            <div className="logo-container">
                <h2 className="logo">stock pulse</h2>
            </div>
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <Link href="/" className="sidebar-nav-link">
                        <BsCurrencyBitcoin className="link-icon" />
                        Crypto
                    </Link>
                    <Link href="/" className="sidebar-nav-link">
                        <AiOutlineBarChart className="link-icon" />
                        Market
                    </Link>
                    <Link href="/" className="sidebar-nav-link">
                        <HiOutlineSquares2X2 className="link-icon" />
                        Dashboard
                    </Link>
                    <Link href="/profile" className="sidebar-nav-link">
                        <AiOutlineUser className="link-icon" />
                        Profile
                    </Link>
                    <Link href="/" className="sidebar-nav-link">
                        <IoSettingsOutline className="link-icon" />
                        Settings
                    </Link>
                </nav>
                <div className="user-container">
                    <p>Welcome back,</p>
                    <p>John Doe</p>
                </div>
            </div>
        </>
    );
}
