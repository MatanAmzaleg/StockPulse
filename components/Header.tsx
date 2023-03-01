import { ChangeEvent, useEffect, useState } from 'react';

export default function Header() {
    const [date, setDate] = useState<Date>(new Date());
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => setDate(new Date()), 1000 * 60);
        return () => clearInterval(intervalId);
    }, []);

    const formmatedDate = () =>
        date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    // const handleInput = (event: KeyboardEvent) => {
    //     if (event.keyCode === 13) {
    //         setFilter(event?.target?.value);
    //     }
    // };

    return (
        <div className="main-header">
            <input
                value={filter}
                type="text"
                // onKeyUp={handleInput}
                onChange={(event) => setFilter(event?.target?.value)}
                placeholder="Search for stocks market"
            />
            <div className="date">{formmatedDate()}</div>
            <div className="user">
                <img src={`https://robohash.org/${11}?set=set5`} alt={'Gi'} />
                <p className="sidebar-nav-link">GM</p>
            </div>
        </div>
    );
}
