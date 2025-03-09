import { supabase } from "./supabaseClient";


// Signup user
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }, // Store username in user metadata
    },
  });

  if (error) throw error;
  return data;
};

// Login user
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
     email, password 
    });
  console.log('Login data:', data);
  if (error) throw error;
  return data;
};

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
  console.log('Login with Github:', data);
  if (error) throw error;
  return data;
}
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  console.log('Login with google:', data);
  if (error) throw error;
  return data;
}


// Logout user
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get current user


// Send password reset email
// export const sendPasswordResetEmail = async (email: string) => {
//   const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${window.location.origin}/reset-password`, // Redirect after reset
//   });

//   if (error) throw error;
//   return data;
// };

// Update user password
// export const updatePassword = async (newPassword: string) => {
//   const { data, error } = await supabase.auth.updateUser({ password: newPassword });

//   if (error) throw error;
//   return data;
// };
