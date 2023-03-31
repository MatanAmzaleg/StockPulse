import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';

export default function Login() {
    const router = useRouter();
    const { register: isRegister } = router.query;
    const { login, register } = useAuth();
    const [type, setType] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        isRegister === 'true' ? setType('register') : setType('login');
    }, [router.query]);

    const submit = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault();
            const { email, password, fullName } =
                e.target as typeof e.target & {
                    email: { value: string };
                    password: { value: string };
                    fullName: { value: string };
                };
            type === 'register'
                ? register(email.value, password.value, fullName.value)
                : login(email.value, password.value);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="login-sec">
            <div className="image grid-center">
                <div className="flex column align-center">
                    <img src="/market.png" className="logo" alt="" />
                    <h1 className="main-title">StockPulse</h1>
                </div>
            </div>
            <div className="login-container">
                <form
                    ref={formRef}
                    className="login-form"
                    // action={`/api/${type}`}
                    // method="post"
                    onSubmit={submit}
                >
                    <h1>{type}</h1>
                    {/* <div className="flex column gap"> */}
                    <input type="email" name="email" placeholder="Email" />
                    {type === 'register' ? (
                        <input
                            type="fullName"
                            name="fullName"
                            placeholder="full name"
                        />
                    ) : null}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    {/* </div> */}
                    <input type="submit" value={type} />
                    {type === 'login' ? (
                        <Link href="/login?register=true">
                            Don't have an account yet?
                        </Link>
                    ) : (
                        <Link href="/login">Alredy have an account?</Link>
                    )}
                </form>
            </div>
        </section>
    );
}
