import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/services/supabaseClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  session: any
  // refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  session : null,
  // refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null)

  // const refreshUser = async () => {
  //   try {
  //     const user = await getCurrentUser();
  //     setUser(user);
  //   } catch (error) {
  //     setUser(null);
  //   }
  // };
  

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setUser(session?.user ?? null);
  //     setSession(session);
  //   })

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })

  //   return () => subscription.unsubscribe()
  // }, [])
  // useEffect(() => {
  //   refreshUser().finally(() => setLoading(false));
  // }, []);
useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        console.error('Auth error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => authListener.subscription.unsubscribe();
}, []);

  return (
    <AuthContext.Provider value={{session, user, loading,  }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
