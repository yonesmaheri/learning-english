import AuthCard from "./components/authCard";
import LoginForm from "./components/loginForm";

function LoginTemplate() {
  return (
    <section className="relative mx-auto flex h-screen w-full max-w-lg items-center justify-center px-4 py-10 sm:px-6" dir="rtl">
      <div className="w-full">
        <AuthCard title="ورود به حساب کاربری">
          <div className="relative">
            <LoginForm />
          </div>
        </AuthCard>
      </div>
    </section>
  );
}

export default LoginTemplate;
