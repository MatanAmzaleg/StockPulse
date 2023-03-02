import Layout from '@/components/layout';
import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${roboto.style.fontFamily};
                    letter-spacing: 0.3px;
                }
            `}</style>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
