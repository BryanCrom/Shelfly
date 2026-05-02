import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabaseClient } from "../utils/SupabaseUtil";

const RegisterPage = () => {
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const registerFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const registerUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!registerFormRef.current) return;

    const registerFormData = new FormData(registerFormRef.current);

    const { data, error } = await supabaseClient.auth.signUp({
      email: registerFormData.get("email") as string,
      password: registerFormData.get("password") as string,
      options: {
        data: {
          display_name: registerFormData.get("username") as string,
        },
      },
    });

    if (error) {
      console.log("Supabase Auth Error: ", error);
      if (error.code === "user_already_exists") {
        setEmailExists(true);
      } else {
        setEmailExists(false);
      }
    } else {
      console.log(data);
      navigate("/");
    }
  };

  return (
    <div className="grid h-screen place-content-center">
      <form onSubmit={registerUser} ref={registerFormRef}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg gap-4 border p-10">
          <legend className="fieldset-legend text-base-content text-4xl">
            Register
          </legend>
          <label id="register_name_input" className="text-base-content text-lg">
            Username:
            <input
              className="input input-primary input-lg w-full"
              id="register_username_input"
              name="username"
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
              name="email"
              type="email"
              placeholder="Please enter an email"
              autoCorrect="email"
              required
            />
            <p
              className="text-error text-lg"
              style={{ visibility: emailExists ? "visible" : "hidden" }}
            >
              Email already exists
            </p>
          </label>

          <label
            id="register_password_input"
            className="text-base-content text-lg"
          >
            Password:
            <input
              className="input input-primary input-lg w-full"
              id="register_password_input"
              name="password"
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
            <button type="submit" className="btn btn-primary w-28">
              Enter
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
