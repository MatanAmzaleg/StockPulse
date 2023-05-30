import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { toastOptions } from '@/utils/hot-toast';
import InputField from '@/components/InputField';

export default function Login() {
    const router = useRouter();
    const { register: isRegister } = router.query;
    const { login, register, user } = useAuth();
    const [type, setType] = useState('');
    const formRef = useRef(null);
 

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


    return (
        <section className="login-sec">
            <div className="image grid-center">
                <div className="flex column align-center">
                    <img src="/logo1.png" className="logo" alt="" />
                </div>
            </div>
            <div className="login-container">
                <form ref={formRef} className="login-form" onSubmit={submit}>
                    <h1>{type}</h1>
                    <InputField label="Email" type="email" icon="email.svg"></InputField>                
                    {type === 'register' ? (
                         <InputField label="Fullname" type="fullName" icon="user.svg"></InputField>
                    ) : null}
                    <InputField label="password" type="password" icon="lock.svg"></InputField>
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
