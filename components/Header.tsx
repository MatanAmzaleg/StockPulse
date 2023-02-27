import { useState } from 'react';

export default function Header() {
    const [date, setDate] = useState<Date>(new Date());

    return (
        <div className="main-header">
            <input type="search" placeholder="Search for stocks market" />
            <div className="date">Saturday 20 February 2023</div>
            <div className="user">
                <img src="" alt="" />
                <p className="sidebar-nav-link">GM</p>
            </div>
        </div>
    );
}
