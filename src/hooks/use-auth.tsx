
"use client";

import { useEffect, useState, createContext, useContext, type ReactNode } from 'react';
import { onAuthStateChanged, signInAnonymously, type User, type AuthCredential, linkWithCredential, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInAnon: () => Promise<void>;
  linkAccount: (credential: AuthCredential) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInAnon = async () => {
    try {
      setLoading(true);
      await signInAnonymously(auth);
      router.push('/reportar');
    } catch (error) {
      console.error("Anonymous sign-in failed:", error);
      toast({
        variant: 'destructive',
        title: 'Error de Autenticación',
        description: 'No se pudo iniciar una sesión anónima. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  const linkAccount = async (credential: AuthCredential) => {
    if (!auth.currentUser || !auth.currentUser.isAnonymous) {
      throw new Error("No anonymous user is currently signed in.");
    }
    try {
      const result = await linkWithCredential(auth.currentUser, credential);
      if (result.user) {
        await sendEmailVerification(result.user);
        toast({
          title: "¡Verifica tu correo!",
          description: "Te hemos enviado un enlace de verificación. Por favor, revisa tu bandeja de entrada.",
        });
      }
      setUser(result.user);
      return result;
    } catch (error: any) {
      console.error("Error linking account:", error);
      toast({
        variant: 'destructive',
        title: 'Error al vincular la cuenta',
        description: error.message,
      });
      throw error;
    }
  };

  const signOut = async () => {
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

  const value = {
    user,
    loading,
    signOut,
    signInAnon,
    linkAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
