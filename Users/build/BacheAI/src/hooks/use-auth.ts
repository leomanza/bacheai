"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, type User, type AuthCredential, linkWithCredential, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signInAnon = async () => {
     try {
        setLoading(true);
        await signInAnonymously(auth);
        router.push('/reportar');
     } catch(error) {
        console.error("Anonymous sign-in failed:", error);
        toast({
            variant: 'destructive',
            title: 'Error de Autenticación',
            description: 'No se pudo iniciar una sesión anónima. Por favor, inténtalo de nuevo.',
        });
     } finally {
        setLoading(false);
     }
  }

  const linkAccount = async (credential: AuthCredential) => {
    if (!auth.currentUser || !auth.currentUser.isAnonymous) {
        throw new Error("No anonymous user is currently signed in.");
    }
    try {
        const result = await linkWithCredential(auth.currentUser, credential);
        
        // Send verification email to the newly linked account
        if (result.user) {
            await sendEmailVerification(result.user);
            toast({
                title: "¡Verifica tu correo!",
                description: "Te hemos enviado un enlace de verificación. Por favor, revisa tu bandeja de entrada.",
            });
        }
        
        setUser(result.user); // update user state
        return result;
    } catch(error: any) {
        console.error("Error linking account:", error);
        toast({
            variant: 'destructive',
            title: 'Error al vincular la cuenta',
            description: error.message,
        });
        throw error;
    }
  }

  const signOutUser = async () => {
    try {
      await auth.signOut();
      setUser(null); 
      router.push('/login');
    } catch (error) {
      console.error("Sign out failed:", error);
       toast({
            variant: 'destructive',
            title: 'Error al cerrar sesión',
            description: 'No se pudo cerrar la sesión correctamente.',
          });
    }
  };

  return { user, loading, signOut: signOutUser, signInAnon, linkAccount };
}
