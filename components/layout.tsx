import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { cryptoSymbol } from 'crypto-symbol';
import { useEffect, useState } from 'react';

const { nameLookup } = cryptoSymbol({});

export default function Layout({ children }: any) {
    const router = useRouter();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const { pathname, query } = router;
        if (!pathname.includes('crypto')) return setTitle('');
        const name = nameLookup(query.symbol as string);
        setTitle('- ' + name || '');
    }, [router.pathname]);

    const dontNeedLayout = () =>
        router.pathname === '/login' || router.pathname === '/landing';

    return (
        <>
            <Head>
                <title>Stock Pulse {title}</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {!dontNeedLayout() ? (
                <main className="home-container">
                    <Sidebar />
                    {children}
                </main>
            ) : (
                children
            )}
        </>
    );
}
