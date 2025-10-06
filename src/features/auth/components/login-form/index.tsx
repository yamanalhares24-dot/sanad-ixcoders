// components/login-form.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginFormSchemaValidation } from "./config";
import { useLoginMutation } from "../../services/mutations";
import { toast } from "react-toastify";
import { userStorage } from "../../storage";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../../routes";
import s from "./LoginExclusive.module.scss";

// إذا الصورة بمجلد public: لا تعمل import. استخدم مسار 루ت:
import ILLUSTRATION_SRC from "/assets/imgs/Side Image.png";

export interface LoginFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(loginFormSchemaValidation),
    mode: "onSubmit",
  });

  const { mutateAsync: loginMutation, isPending } = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInput> = async (form) => {
    try {
      const { token, user } = await loginMutation(form); // AuthResult
      userStorage.set(token);
      toast.success(`Login successfully. Welcome back, ${user.name}`);
      navigate(appRoutes.home);
    } catch (e) {
      console.error(e);
      toast.error("Failed to login");
    }
  };

  return (
    <section className={s.root}>
      <div className={s.wrap}>
        <aside className={s.art}>
          <img src={ILLUSTRATION_SRC} alt="" />
        </aside>

        <main className={s.panel}>
          <h1 className={s.title}>Log in to Exclusive</h1>
          <p className={s.subtitle}>Enter your details below</p>

          <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className={s.field}>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                required
              />
              {errors.email?.message && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
            </label>

            <label className={s.field}>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                required
              />
              {errors.password?.message && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </label>

            <div className={s.actions}>
              <button
                className={`${s.btn} ${s.primary}`}
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Logging in…" : "Log In"}
              </button>
              <a href="#" className={s.forgot}>
                Forget Password?
              </a>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
};

export default LoginForm;
