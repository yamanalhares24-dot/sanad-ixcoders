// components/signup-form.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signupFormSchemaValidation } from "./config";
import { useSignUpMutation } from "../../services/mutations";
import { toast } from "react-toastify";
import { userStorage } from "../../storage";
import s from "./AuthCreateAccount.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../../../../routes";

// لا تعمل import من /public
import ILLUSTRATION_SRC from "/assets/imgs/Side Image.png";

export interface SignUpFormInput {
  name: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(signupFormSchemaValidation),
    mode: "onSubmit",
  });

  const { mutateAsync: signUpMutation, isPending } = useSignUpMutation();

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    try {
      const { token, user } = await signUpMutation(data); // AuthResult
      userStorage.set(token);
      toast.success(`Account created. Welcome, ${user.name}`);
      navigate(appRoutes.home);
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Failed to sign up");
    }
  };

  return (
    <section className={s.root}>
      <div className={s.wrap}>
        <aside className={s.art}>
          <img src={ILLUSTRATION_SRC} alt="" />
        </aside>

        <main className={s.panel}>
          <h1 className={s.title}>Create an account</h1>
          <p className={s.subtitle}>Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
            <label className={s.field}>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                required
              />
              {errors.name?.message && (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              )}
            </label>

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

            <button
              className={`${s.btn} ${s.primary} ${s.block}`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating…" : "Create Account"}
            </button>

            <button type="button" className={s.google}>
              <img
                className={s.googleIcon}
                alt="Google"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              <span>Sign up with Google</span>
            </button>
          </form>

          <p className={s.authFooter}>
            Already have account?{" "}
            <Link to={appRoutes.auth.login} className={s.link}>
              Log in
            </Link>
          </p>
        </main>
      </div>
    </section>
  );
};

export default SignUpForm;
