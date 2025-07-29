"use client";

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateAlias } from '@/lib/utils';
import { Loader2, Camera, Shield, Crown, Edit, UserCheck } from 'lucide-react';
import { updateUserProfilePhoto } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { getDictionary } from '@/lib/i18n';
import LoginForm from '@/components/LoginForm';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [alias, setAlias] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary().then(setDict);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      setAlias(generateAlias(user.uid));
      setProfilePhotoUrl(user.photoURL);
    }
  }, [user, loading, router]);

  const handleAvatarClick = () => {
    if (user?.isAnonymous) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      setIsUploading(true);
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          const result = await updateUserProfilePhoto(user.uid, base64data);
          if (result.success && result.photoUrl) {
            setProfilePhotoUrl(result.photoUrl);
            toast({
              title: "¡Foto de perfil actualizada!",
              description: "Tu nueva foto de perfil se ha guardado.",
            });
          } else {
            throw new Error(result.error || 'Failed to upload photo.');
          }
        };
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error al subir la foto',
          description: error.message,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };


  if (loading || !user || !dict) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      {user.isAnonymous ? (
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
                            <Edit className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                            <div>
                                <span className="font-semibold">Edita tus Aportes</span>
                                <p className="text-sm text-muted-foreground">Corrige o ajusta las medidas y descripciones de tus reportes después de enviarlos.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                             <UserCheck className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                             <div>
                                <span className="font-semibold">Gana Puntos y Sube de Nivel</span>
                                <p className="text-sm text-muted-foreground">Acumula puntos por cada reporte validado y compite en la tabla de líderes.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                             <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                             <div>
                                <span className="font-semibold">Conserva tu Identidad</span>
                                <p className="text-sm text-muted-foreground">Mantén tu alias y todo tu historial de reportes de forma segura bajo tu nueva cuenta.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <LoginForm dict={dict.loginForm} isConversionFlow={true} />
            </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader className="items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage src={profilePhotoUrl || undefined} alt="User Avatar" />
                <AvatarFallback className="text-3xl">
                  {alias.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={handleAvatarClick}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                <span className="sr-only">Cambiar foto de perfil</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <CardTitle className="mt-4 text-3xl font-bold">{alias}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
                ¡Gracias por ser un miembro registrado! Tus contribuciones son muy valiosas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
