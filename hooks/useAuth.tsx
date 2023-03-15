import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { UserDocument } from '@/model/user.schema';
import axios from 'axios';

interface IAuth {
    user: UserDocument | null;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, fullName: string) => void;
    logout: () => void;
    loading: boolean;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
    user: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    loading: true,
});

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    async function login(email: string, password: string) {
        setLoading(true);
        try {
            const user = await axios.post('/api/auth/login', {
                email,
                password,
            });
            setUser(user.data);
            router.push('/');
        } catch ({ message }) {
            alert(message);
        } finally {
            setLoading(false);
        }
    }

    async function register(email: string, password: string, fullName: string) {
        setLoading(true);
        try {
            const user = await axios.post('/api/auth/register', {
                email,
                password,
                fullName,
            });
            if (!user) return;
            setUser(user.data);
            router.push('/');
        } catch ({ message }) {
            alert(message);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/auth/logout');
            console.log(data.message);
            setUser(null);
            console.log('hello');

            router.push('/login');
        } catch ({ message }) {
            alert(message);
        } finally {
            setLoading(false);
        }
    }

    const checkCookie = async () => {
        const userFromCookie = getCookie('loggedInUser');

        if (userFromCookie) {
            const res = await axios.get(`/api/user/${userFromCookie}`, {
                headers: { header1: 'Access-Control-Allow-Origin' },
            });
            const user = await res.data;
            setUser(user);
            console.log(userFromCookie, user);

            setLoading(false);
        } else {
            setUser(null);
            setLoading(true);
            router.push('/login');
        }
    };

    useEffect(() => {
        checkCookie();
    }, []);

    useEffect(() => {
        // Store the user in a cookie when the user state changes
        console.log('third');

        // console.log(user);

        if (user) setCookie('loggedInUser', user.email);
        else {
            deleteCookie('loggedInUser');
            console.log('hello');
            router.push('/login');
        }
    }, [user]);

    const memoedValue = useMemo(
        () => ({ user, register, login, loading, logout }),
        [user, loading]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to access the auth context
export default function useAuth() {
    return useContext(AuthContext);
}
