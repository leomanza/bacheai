"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AuthError,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/i18n";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";


type View = "signIn" | "signUp" | "forgotPassword" | "awaitingVerification" | "resetSent";

interface LoginFormProps {
  dict: Dictionary["loginForm"];
  isConversionFlow?: boolean;
}

const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un email válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export default function LoginForm({ dict, isConversionFlow = false }: LoginFormProps) {
  const [view, setView] = useState<View>(isConversionFlow ? "signUp" : "signIn");
  const [error, setError] = useState<string | null>(null);
  const { user, linkAccount } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    const { email, password } = values;

    try {
      if (view === "signIn") {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "¡Bienvenido de nuevo!", description: "Has iniciado sesión correctamente."});
        router.push("/reportar");
      } else if (view === 'signUp') {
        if(isConversionFlow && user?.isAnonymous) {
          const credential = EmailAuthProvider.credential(email, password);
          await linkAccount(credential);
          toast({ title: "¡Cuenta vinculada!", description: "Tu cuenta anónima ahora es permanente."});
          router.push("/perfil");
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          setView("awaitingVerification");
        }
      }
    } catch (err) {
      const authError = err as AuthError;
      console.error(authError.code, authError.message);
      const message = dict.errors[authError.code as keyof typeof dict.errors] || dict.errors.default;
      setError(message);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    const email = form.getValues("email");
    if (!email) {
        setError("Por favor, ingresa tu email para restablecer la contraseña.");
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        setView("resetSent");
    } catch(err) {
        const authError = err as AuthError;
        const message = dict.errors[authError.code as keyof typeof dict.errors] || dict.errors.default;
        setError(message);
    }
  }

  const handleSwitchView = (newView: View) => {
    setError(null);
    form.reset();
    setView(newView);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{dict.title[view]}</CardTitle>
        <CardDescription>{dict.description[view]}</CardDescription>
      </CardHeader>
      <CardContent>
        {view === "awaitingVerification" ? (
          <div className="text-center space-y-4">
            <Mail className="h-16 w-16 text-primary mx-auto"/>
            <p className="text-muted-foreground">{dict.awaitingVerification.instructions}</p>
            <Button onClick={() => handleSwitchView("signIn")}>{dict.awaitingVerification.signInButton}</Button>
          </div>
        ) : view === "resetSent" ? (
            <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto"/>
            <p className="text-muted-foreground">{dict.resetSent.instructions}</p>
            <Button onClick={() => handleSwitchView("signIn")}>{dict.resetSent.signInButton}</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dict.emailLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dict.passwordLabel}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {dict.button[view]}
              </Button>
            </form>
          </Form>
        )}
        
        {!isConversionFlow && (
        <div className="mt-4 text-center text-sm">
          {view === "signIn" && (
            <>
              {dict.prompt.signIn.prefix}
              <Button variant="link" onClick={() => handleSwitchView("signUp")}>
                {dict.prompt.signIn.link}
              </Button>
               <Button variant="link" onClick={() => handleSwitchView("forgotPassword")}>
                {dict.prompt.signIn.forgotPassword}
              </Button>
            </>
          )}
          {view === "signUp" && (
            <>
              {dict.prompt.signUp.prefix}
              <Button variant="link" onClick={() => handleSwitchView("signIn")}>
                {dict.prompt.signUp.link}
              </Button>
            </>
          )}
           {view === "forgotPassword" && (
             <Button variant="link" onClick={handleForgotPassword} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {dict.button.forgotPassword}
             </Button>
          )}
        </div>
        )}
      </CardContent>
    </Card>
  );
}
