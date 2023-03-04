import Layout from '@/components/layout';
import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const dontNeedLayout = () => {
        return router.pathname === '/login';
    };

    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${roboto.style.fontFamily};
                    letter-spacing: 0.3px;
                }
            `}</style>

            {dontNeedLayout() ? (
                <Component {...pageProps} />
            ) : (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )}
        </>
    );
}
