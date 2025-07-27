"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, ingresa un correo válido." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type Action = "login" | "register";

interface LoginFormProps {
  dict: Dictionary["loginForm"];
}

export default function LoginForm({ dict }: LoginFormProps) {
  const [action, setAction] = useState<Action>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setInfo(null);
    const { email, password } = values;

    try {
      if (action === "login") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (!userCredential.user.emailVerified) {
          setError(dict.errors.emailNotVerified);
          await auth.signOut();
        } else {
          router.push("/");
          toast({
            title: dict.toasts.loginSuccess.title,
            description: dict.toasts.loginSuccess.description,
          });
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);
        await auth.signOut();
        setAction("login");
        setInfo(dict.info.verificationEmailSent);
        form.reset();
      }
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err.code, dict.errors));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const email = form.getValues("email");
    if (!email) {
      form.setError("email", {
        type: "manual",
        message: dict.errors.emailRequiredForReset,
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setInfo(dict.info.passwordResetSent);
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err.code, dict.errors));
    } finally {
      setIsLoading(false);
    }
  };
  
  const getFirebaseErrorMessage = (errorCode: string, dictErrors: Dictionary["loginForm"]["errors"]) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return dictErrors.invalidEmail;
      case 'auth/user-disabled':
        return dictErrors.userDisabled;
      case 'auth/user-not-found':
        return dictErrors.userNotFound;
      case 'auth/wrong-password':
        return dictErrors.wrongPassword;
      case 'auth/email-already-in-use':
        return dictErrors.emailInUse;
      case 'auth/too-many-requests':
        return dictErrors.tooManyRequests;
      default:
        return dictErrors.default;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {action === "login" ? dict.login.title : dict.register.title}
        </CardTitle>
        <CardDescription>
          {action === "login"
            ? dict.login.description
            : dict.register.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>{dict.errors.title}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
             {info && (
              <Alert variant="default" className="border-green-500 text-green-700">
                <AlertTitle>{dict.info.title}</AlertTitle>
                <AlertDescription>{info}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.form.email}</FormLabel>
                  <FormControl>
                    <Input placeholder="usuario@email.com" {...field} />
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
                  <FormLabel>{dict.form.password}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : action === "login" ? (
                <LogIn className="mr-2 h-4 w-4" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {action === "login"
                ? dict.login.submitButton
                : dict.register.submitButton}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {action === "login" ? (
            <>
              {dict.login.switchText}{" "}
              <Button variant="link" onClick={() => setAction("register")}>
                {dict.login.switchButton}
              </Button>
            </>
          ) : (
            <>
              {dict.register.switchText}{" "}
              <Button variant="link" onClick={() => setAction("login")}>
                {dict.register.switchButton}
              </Button>
            </>
          )}
        </div>
        <div className="mt-2 text-center text-sm">
          <Button variant="link" onClick={handlePasswordReset} className="p-0 h-auto">
            {dict.form.forgotPassword}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
