import { useRef } from "react";
import { Link } from "react-router";

const LoginPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="grid h-screen place-content-center">
      <form ref={formRef}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg gap-10 border p-10">
          <legend className="fieldset-legend text-base-content text-4xl">
            Login
          </legend>
          <label id="login_email_input" className="text-base-content text-lg">
            Email:
            <input
              className="input input-primary input-lg w-full"
              id="login_email_input"
              name="email_input"
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
              name="password_input"
              type="password"
              placeholder="Please enter your password"
              required
            />
          </label>

          <div className="mx-auto flex gap-18">
            <Link to="/register">
              <button className="btn btn-primary w-28">Register</button>
            </Link>
            <Link to="/home">
              <button className="btn btn-primary w-28">Enter</button>
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
