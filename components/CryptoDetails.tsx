import useWebSockets from '@/hooks/useWebSockets';
import { useRouter } from 'next/router';
import HotCryptoPreview from './HotCryptoPreview';
import axios from 'axios'

export default function CryptoDetails(props: any) {
    
    const router = useRouter();
    const { symbol } = router.query;

    const { currencies } = symbol
        ? useWebSockets([symbol as string])
        : { currencies: {} };

    return (
        <div>
            <HotCryptoPreview
                crypto={currencies[symbol as keyof typeof currencies]!}
            />
        </div>
    );
}


