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
    addToWatchList: (symbol: string) => void;
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
    addToWatchList: async () => {},
    loading: true,
});

const USER_COOKIE = 'loggedInUser';

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
            deleteCookie(USER_COOKIE);
            setUser(null);
        } catch ({ message }) {
            alert(message);
        } finally {
            setLoading(false);
        }
    }

    async function addToWatchList(symbol: string) {
        setLoading(true);
        // const newUser = { ...user, watchlist: [...user!.watchlist, symbol] };
        try {
            await axios.post(`/api/user/${user?.email}`, { symbol });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const checkCookie = async () => {
        const userFromCookie = getCookie(USER_COOKIE);
        try {
            if (userFromCookie) {
                const res = await axios.get(`/api/user/${userFromCookie}`, {
                    headers: { header1: 'Access-Control-Allow-Origin' },
                });
                const user = await res.data;
                setUser(user);
                // setLoading(false);
            } else {
                setUser(null);
                // setLoading(true);
                // router.push('/login');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        checkCookie();
    }, []);

    useEffect(() => {
        if (user) {
            setCookie(USER_COOKIE, user.email);
        } else {
            // deleteCookie(USER_COOKIE);
            // console.log('hello');
            // router.push('/login');
        }
    }, [user]);

    const memoedValue = useMemo(
        () => ({ user, register, login, loading, logout, addToWatchList }),
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
