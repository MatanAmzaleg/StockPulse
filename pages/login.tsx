import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { toastOptions } from '@/utils/hot-toast';

export default function Login() {
    const router = useRouter();
    const { register: isRegister } = router.query;
    const { login, register, user } = useAuth();
    const [type, setType] = useState('');
    const formRef = useRef(null);
    const [inputFocuses, setInputFocuses ] = useState({email : false});

    useEffect(() => {
        isRegister === 'true' ? setType('register') : setType('login');
    }, [router.query]);

    const submit = async (e: SyntheticEvent) => {
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
            toast(`welcom back `, toastOptions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFocusEmail = (isFocused:"t" | "f") => {
     setInputFocuses((prev) => ({...prev, email: isFocused === "t" ? true : false}))
    }

    const handleType = () => {
        
    }


    return (
        <section className="login-sec">
            <div className="image grid-center">
                <div className="flex column align-center">
                    <img src="/market.png" className="logo" alt="" />
                    <h1 className="main-title">StockPulse</h1>
                </div>
            </div>
            <div className="login-container">
                <form ref={formRef} className="login-form" onSubmit={submit}>
                    <h1>{type}</h1>
                    <div className="input-container">
                        <img src="email.svg" alt="" />
                        <label onInput={ () => handleType()} className={inputFocuses.email ? 'email-focus' : ''} id="email-label" htmlFor="">Email</label>
                        <input
                        onFocus={() => handleFocusEmail("t")}
                        onBlur={() => handleFocusEmail("f")}
                            type="email"
                            name="email" /*placeholder="Email"*/
                        />
                    </div>
                    {type === 'register' ? (
                        <div className="input-container">
                            <img src="user.svg" alt="" />
                            <label  htmlFor="">Fullname</label>
                            <input
                                type="fullName"
                                name="fullName"
                                // placeholder="full name"
                            />
                        </div>
                    ) : null}
                    <div className="input-container">
                        <img src="lock.svg" alt="" />
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            name="password"
                            // placeholder="Password"
                        />
                    </div>
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
