// import {
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signOut,
//     User,
// } from 'firebase/auth';

// import { auth } from '../firebase';
// import { useRouter } from 'next/router';
// import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// const AuthContext = createContext<IAuth>({
//     user: null,
//     signUp: async () => {},
//     signIn: async () => {},
//     logout: async () => {},
//     error: null,
//     loading: false,
// });

// interface IAuth {
//     user: User | null;
//     signUp: (email: string, password: string) => Promise<void>;
//     signIn: (email: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;
//     error: string | null;
//     loading: boolean;
// }

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [loading, setLoading] = useState(false);
//     const [user, setUser] = useState<User | null>(null);
//     const [error, setError] = useState(null);
//     const [initialLoading, setInitialLoading] = useState(true);
//     const router = useRouter();

//     useEffect(
//         () =>
//             onAuthStateChanged(auth, (user) => {
//                 if (user) {
//                     // Logged in...
//                     setUser(user);
//                     setLoading(false);
//                 } else {
//                     // Not logged in...
//                     setUser(null);
//                     setLoading(true);
//                     router.push('/login');
//                 }

//                 setInitialLoading(false);
//             }),
//         [auth]
//     );

//     const signUp = async (email: string, password: string) => {
//         setLoading(true);

//         try {
//             const { user } = await createUserWithEmailAndPassword(
//                 auth,
//                 email,
//                 password
//             );
//             setUser(user);
//             router.push('/');
//         } catch ({ message }) {
//             alert(message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const signIn = async (email: string, password: string) => {
//         setLoading(true);

//         try {
//             const userCredential = await signInWithEmailAndPassword(
//                 auth,
//                 email,
//                 password
//             );
//             setUser(userCredential.user);
//             router.push('/');
//             setLoading(false); //Maybe Remove
//         } catch ({ message }) {
//             alert(message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = async () => {
//         setLoading(true);
//         try {
//             await signOut(auth);
//             setUser(null);
//         } catch ({ message }) {
//             alert(message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const memoedValue = useMemo(
//         () => ({ user, signUp, signIn, loading, logout, error }),
//         [user, loading]
//     );

//     return (
//         <AuthContext.Provider value={memoedValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default function useAuth() {
//     return useContext(AuthContext);
// }
