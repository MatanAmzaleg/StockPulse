import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Landing() {
    const router = useRouter();

    return (
        <section className="landing-container">
            <header className="landing-header">
                <div className="logo">Stock-Pulse</div>
                <button onClick={() => router.push('/login')}>Sign In</button>
            </header>
            <main>
                <section className="content">
                    <h1>Live and ondemand trading</h1>
                    <h6>
                        Your guide to the world of an open financial system. Get
                        started with the easiest and most secure platform to
                        trade crypto currency and stocks{' '}
                    </h6>
                    <button className='explore-btn' onClick={() => router.push('/')}>
                        Explore Now
                    </button>
                </section>
                {/* <Image
                    src="/landing.png"
                    alt="landing"
                    // width={''}
                    // height={100}
                /> */}
                <img src="landing2-removebg.png" alt="landing" className='landing-img' />
            </main>
        </section>
    );
}
