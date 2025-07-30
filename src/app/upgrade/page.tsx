
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck, Crown, Activity, Flag } from 'lucide-react';
import { getDictionary } from '@/lib/i18n';
import LoginForm from '@/components/LoginForm';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export default function UpgradePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary().then(setDict);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    // If user is already permanent, redirect to profile
    if (!loading && user && !user.isAnonymous) {
        router.push('/perfil');
    }
  }, [user, loading, router]);


  if (loading || !user || !dict || !user.isAnonymous) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold flex items-center justify-center gap-3"><Crown className="h-7 w-7 text-yellow-500" />Conviértete en Usuario Permanente</CardTitle>
                <CardDescription className="text-center max-w-xl mx-auto">
                    Al registrarte con tu correo, desbloqueas funciones exclusivas y ayudas a que tus contribuciones tengan aún más impacto. ¡Tu alias y todos tus reportes se conservarán!
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ventajas de registrarte:</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                            <div>
                                <span className="font-semibold">Verifica y Modera Reportes</span>
                                <p className="text-sm text-muted-foreground">Ayuda a la comunidad reportando baches como solucionados o incorrectos. Tu validación es clave.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                             <Activity className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                             <div>
                                <span className="font-semibold">Sigue tus Reportes y Gana Puntos</span>
                                <p className="text-sm text-muted-foreground">Activa el "modo seguimiento" para documentar la evolución de un bache y gana más puntos por tu constancia.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                             <Flag className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                             <div>
                                <span className="font-semibold">Participa en Campañas Exclusivas</span>
                                <p className="text-sm text-muted-foreground">Accede a campañas de reporte zonificadas con objetivos y recompensas especiales.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <LoginForm dict={dict.loginForm} isConversionFlow={true} />
            </CardContent>
        </Card>
    </div>
  );
}
