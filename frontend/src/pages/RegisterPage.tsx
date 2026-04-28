import { useRef, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabaseClient } from "../utils/SupabaseUtil";

const RegisterPage = () => {
  const registerFormRef = useRef<HTMLFormElement>(null);

  const registerUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!registerFormRef.current) return;

    const formData = new FormData(registerFormRef.current);

    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.get("email_input") as string,
      password: formData.get("password_input") as string,
      options: {
        data: {
          display_name: formData.get("name_input") as string,
        },
      },
    });

    console.log(data, error);
  };

  return (
    <div className="grid h-screen place-content-center">
      <form onSubmit={registerUser} ref={registerFormRef}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg gap-10 border p-10">
          <legend className="fieldset-legend text-base-content text-4xl">
            Register
          </legend>
          <label id="register_name_input" className="text-base-content text-lg">
            Name:
            <input
              className="input input-primary input-lg w-full"
              id="register_name_input"
              name="name_input"
              type="text"
              placeholder="Please enter your name"
              required
            />
          </label>

          <label
            id="register_email_input"
            className="text-base-content text-lg"
          >
            Email:
            <input
              className="input input-primary input-lg w-full"
              id="register_email_input"
              name="email_input"
              type="email"
              placeholder="Please enter an email"
              autoCorrect="email"
              required
            />
          </label>

          <label
            id="register_password_input"
            className="text-base-content text-lg"
          >
            Password:
            <input
              className="input input-primary input-lg w-full"
              id="register_password_input"
              name="password_input"
              type="password"
              placeholder="Please enter a password"
              required
            />
          </label>

          <div className="mx-auto flex gap-18">
            <Link to="/">
              <button type="button" className="btn btn-primary w-28">
                Back
              </button>
            </Link>
            <Link to="/">
              <button type="submit" className="btn btn-primary w-28">
                Enter
              </button>
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
