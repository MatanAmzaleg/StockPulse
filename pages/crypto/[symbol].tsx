import Head from 'next/head';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CryptoDetails from '@/components/CryptoDetails';
import axios from 'axios'

export default function CryptoSymbol({ data } : any) {


   console.log(data);
   

    return (
        <>
            <Head>
                <title>Stock Pulse</title>
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
                <CryptoDetails currency={data} />
            </main>
        </>
    );
}


export const getServerSideProps = async (context : any ) => {
    try {
        const { symbol } = context.params;
        const apiKey = process.env.POLYGON_API_KEY;  
        const url = `https://api.polygon.io/v2/aggs/ticker/X:${symbol}/range/1/day/2023-02-28/2023-03-01?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;
        
        const response = await axios.get(url);
        
        const data = response.data.results;
        
        return { props: { data } };
        
    } catch (err) {
      console.log('failed to fetch crypto details', err);
      
    }
};