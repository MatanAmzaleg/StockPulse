import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';
import {
    AiOutlineBarChart,
    AiOutlineUser,
    AiOutlineStar,
} from 'react-icons/ai';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { BsCurrencyBitcoin } from 'react-icons/bs';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { errorToastOptions, toastOptions } from '@/utils/hot-toast';

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout, user } = useAuth();
    const router = useRouter();
    const links = {
        crypto: <BsCurrencyBitcoin className="link-icon" />,
        wishlist: <AiOutlineStar className="link-icon" />,
        profile: <AiOutlineUser className="link-icon" />,
        settings: <IoSettingsOutline className="link-icon" />,
    };

    const goToLogin = () => router.push('/login');

    const onLogout = () => {
        logout();
        toast(`Bye`, toastOptions);
    };

    return (
        <section className={`sidebar-section ${isSidebarOpen ? 'closed' : ''}`}>
            {/* <button
                className="hamburger-btn"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                hamburger
            </button> */}
            <div className="logo-container">
                <h2 className="logo">stock pulse</h2>
            </div>
            <div className="sidebar">
                <nav className="sidebar-nav">
                    {Object.keys(links).map((link) => (
                        <Link
                            href={'/' + link}
                            className={`sidebar-nav-link ${
                                router.pathname.includes(link) && 'active'
                            }`}
                        >
                            {links[link as keyof typeof links]}
                            <span>{link}</span>
                        </Link>
                    ))}
                    <button
                        className="sidebar-nav-link"
                        onClick={() => {
                            console.log('toast');
                            toast('toast', errorToastOptions);
                        }}
                    >
                        Toast
                    </button>
                </nav>
            </div>
            {user ? (
                <div className="user-container">
                    <p>Welcome back,</p>
                    <p className="username">{user?.fullName}</p>
                    <button onClick={onLogout}>Logout</button>
                </div>
            ) : (
                <div className="user-container">
                    <button onClick={goToLogin}>Login</button>
                </div>
            )}
        </section>
    );
}
