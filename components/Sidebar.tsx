import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineBarChart, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { BsCurrencyBitcoin } from 'react-icons/bs';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout, user } = useAuth();
    const router = useRouter();
    const goToLogin = () => router.push('/login');

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
                    <Link
                        href="/"
                        className={`sidebar-nav-link ${
                            router.pathname === '/' && 'active'
                        }`}
                    >
                        <BsCurrencyBitcoin className="link-icon" />
                        <span>Crypto</span>
                    </Link>
                    <Link
                        href="/"
                        className={`sidebar-nav-link ${
                            router.pathname === '/' && 'active'
                        }`}
                    >
                        <AiOutlineBarChart className="link-icon" />
                        <span>Market</span>
                    </Link>
                    <Link
                        href="/"
                        className={`sidebar-nav-link ${
                            router.pathname === '/' && 'active'
                        }`}
                    >
                        <HiOutlineSquares2X2 className="link-icon" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/profile"
                        className={`sidebar-nav-link ${
                            router.pathname.includes('profile') && 'active'
                        }`}
                    >
                        <AiOutlineUser className="link-icon" />
                        <span>Profile</span>
                    </Link>
                    <Link
                        href="/"
                        className={`sidebar-nav-link ${
                            router.pathname === '/' && 'active'
                        }`}
                    >
                        <IoSettingsOutline className="link-icon" />
                        <span>Settings</span>
                    </Link>
                </nav>
            </div>
            {user ? (
                <div className="user-container">
                    <p>Welcome back,</p>
                    <p className="username">{user?.fullName}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className="user-container">
                    <button onClick={goToLogin}>Login</button>
                </div>
            )}
        </section>
    );
}
