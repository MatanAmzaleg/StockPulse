import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function Header() {
    const [date, setDate] = useState<Date>(new Date());
    const [filter, setFilter] = useState('');
    const router = useRouter();

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

    const search = (event: FormEvent) => {
        event.preventDefault();
        router.push(`/search?crypto=${filter}`);
    };

    return (
        <div className="main-header">
            <form onSubmit={search}>
                <input
                    value={filter}
                    type="text"
                    onChange={({ target }) => setFilter(target?.value)}
                    placeholder="Search by crypto symbol"
                />
            </form>
            <div className="date">{formmatedDate()}</div>
            <div className="user">
                <img src={`https://robohash.org/${11}?set=set5`} alt={'Gi'} />
                <p className="sidebar-nav-link">GM</p>
            </div>
        </div>
    );
}
