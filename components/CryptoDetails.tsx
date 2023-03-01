import useWebSockets from '@/hooks/useWebSockets';
import { useRouter } from 'next/router';
import HotCryptoPreview from './HotCryptoPreview';
import axios from 'axios'

export default function CryptoDetails(props: any) {
    
    const router = useRouter();
    const { symbol } = router.query;

    const {currencyData} = props
    
    
    const { currencies } = symbol
    ? useWebSockets([symbol as string])
    : { currencies: {} };
    
    console.log(currencyData, currencies);
    return (
       <section className="crypto-details-sec">

       </section>
    );
}


