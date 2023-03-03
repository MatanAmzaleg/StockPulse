import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Login() {
    const [type, setType] = useState('');
    const router = useRouter();
    const { register } = router.query;

    useEffect(() => {
        register === 'true' ? setType('register') : setType('login');
    }, [router.query]);

    return (
        <section className="login-sec">
            <div className="image"></div>
            <div className="login-container">
                <form
                    className="login-form"
                    action={`/api/${type}`}
                    method="post"
                >
                    <h1>{type}</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                    ></input>
                    <input type="submit" value={type}></input>
                    {type === 'login' ? (
                        <Link href="/login?register=true">
                            Dont have an account yet?
                        </Link>
                    ) : (
                        <Link href="/login">Alredy have an account?</Link>
                    )}
                </form>
            </div>
        </section>
    );
}
