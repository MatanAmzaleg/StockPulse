import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function Home() {
    const key = process.env.ALPACA_KEY;
    console.log(key);

    return (
        <>
            <Head>
                <title>Create Next App</title>
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
            <main className="home-container">
                <Header />

                <Sidebar />
            </main>
        </>
    );
}
