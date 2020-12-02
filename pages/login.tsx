import React, { useState, useEffect, useReducer } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/Layout";
import { IBody, SyntheticEvent } from "../types/ITemplates";

const initialState = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, { mutate }] = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace("/dashboard");
  }, [user]);

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const body: IBody = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    const res: Response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg("Incorrect username or password. Try again!");
    }
  }

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const { email, password } = state;

  return (
    <Layout title="Login">
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <form onSubmit={onSubmit}>
              {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  onChange={handleChange}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  value={password}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
            <p className="lead mt-4">
              {" "}
              No Account?
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
