import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export const getSession = async (): Promise<{ session: Session | null; user: User | null }> => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  
  return {
    session,
    user: session?.user || null,
  };
};

export const signIn = async (email: string, password: string) => {
  // We strictly enforce only the admin email can login
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  
  if (adminEmail && email.toLowerCase() !== adminEmail.toLowerCase()) {
    throw new Error('Unauthorized access. Only the administrator can log in.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
