import useWebSockets from '@/hooks/useWebSockets';
import { useRouter } from 'next/router';
import HotCryptoPreview from './HotCryptoPreview';

export default function CryptoDetails() {
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
