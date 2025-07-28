
"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // If no user, sign in anonymously
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
          toast({
            variant: 'destructive',
            title: 'Error de Autenticación',
            description: 'No se pudo iniciar una sesión anónima. Por favor, recarga la página.',
          });
          setLoading(false);
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [toast]);

  const signOutUser = async () => {
    try {
      await auth.signOut();
      setUser(null); 
      // After signing out, immediately sign in anonymously again to maintain a session
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Sign out failed:", error);
       toast({
            variant: 'destructive',
            title: 'Error al cerrar sesión',
            description: 'No se pudo cerrar la sesión correctamente.',
          });
    }
  };

  return { user, loading, signOut: signOutUser };
}
