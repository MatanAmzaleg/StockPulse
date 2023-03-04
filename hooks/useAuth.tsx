import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { UserDocument } from '@/model/user.schema';

interface IAuth {
    user: UserDocument | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    loading: boolean;
}

// Create a context for the auth
const AuthContext = createContext<IAuth>({
    user: null,
    login: () => {},
    logout: () => {},
    loading: true,
});

// Define a provider for the auth context
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Define your authentication logic here
    const login = (email: string, password: string) => {
        // Perform your login logic here, such as calling an API endpoint or using a third-party library
        // Once the user is authenticated, set the user state
        // setUser({
        //     email: email,
        //     name: 'John Doe',
        // });
    };

    const logout = () => {
        // Perform your logout logic here, such as clearing any authentication tokens or cookies
        // Once the user is logged out, set the user state to null
        setUser(null);
        router.push('/');
    };

    useEffect(() => {
        // Check if the user is authenticated on initial load
        const userFromCookie = getCookie('loggedInUser');
        if (userFromCookie) setUser(JSON.parse(userFromCookie as string));
        setLoading(false);
    }, []);

    useEffect(() => {
        // Store the user in a cookie when the user state changes
        user
            ? setCookie('loggedInUser', JSON.stringify(user))
            : deleteCookie('loggedInUser');
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to access the auth context
export default function useAuth() {
    return useContext(AuthContext);
}
