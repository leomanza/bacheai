import LoginForm from "@/components/LoginForm";
import { getDictionary } from "@/lib/i18n";

export default async function LoginPage() {
  const dict = await getDictionary();

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm dict={dict.loginForm} />
      </div>
    </div>
  );
}
