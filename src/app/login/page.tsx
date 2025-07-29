import LoginForm from "@/components/LoginForm";
import { getDictionary } from "@/lib/i18n";
import { Suspense } from "react";

function LoginFormSkeleton() {
  return <div className="w-full max-w-md h-[400px] bg-muted rounded-lg animate-pulse" />;
}

export default async function LoginPage() {
  const dict = await getDictionary();
  return (
    <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm dict={dict.loginForm} />
      </Suspense>
    </div>
  );
}
