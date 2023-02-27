import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">stock pulse</div>
            <nav className="sidebar-nav">
                {/* <Link></Link> */}
                <p>Market</p>
                <p>Dashboard</p>
                <p>Setting</p>
                <p>Crypto Currency</p>
            </nav>
        </div>
    );
}
