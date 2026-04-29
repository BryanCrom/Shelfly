import { useRef, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { supabaseClient } from "../utils/SupabaseUtil";

const LoginPage = () => {
  const loginFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginFormRef.current) return;

    const loginFormData = new FormData(loginFormRef.current);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: loginFormData.get("email") as string,
      password: loginFormData.get("password") as string,
    });

    if (error) {
      console.log("Supabase Auth Error: ", error);
    } else {
      console.log(data);
      navigate("/home");
    }
  };

  return (
    <div className="grid h-screen place-content-center">
      <form onSubmit={loginUser} ref={loginFormRef}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg gap-10 border p-10">
          <legend className="fieldset-legend text-base-content text-4xl">
            Login
          </legend>
          <label id="login_email_input" className="text-base-content text-lg">
            Email:
            <input
              className="input input-primary input-lg w-full"
              id="login_email_input"
              name="email"
              type="email"
              placeholder="Please enter your email"
              autoCorrect="email"
              required
            />
          </label>
          <label
            id="login_password_input"
            className="text-base-content text-lg"
          >
            Password:
            <input
              className="input input-primary input-lg w-full"
              id="login_password_input"
              name="password"
              type="password"
              placeholder="Please enter your password"
              required
            />
          </label>

          <div className="mx-auto flex gap-18">
            <Link to="/register">
              <button type="button" className="btn btn-primary w-28">
                Register
              </button>
            </Link>
            <button type="submit" className="btn btn-primary w-28">
              Enter
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
