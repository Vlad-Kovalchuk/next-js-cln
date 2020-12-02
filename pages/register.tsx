import React, {
  useState,
  useEffect,
  useReducer,
  BaseSyntheticEvent,
} from "react";
import Router from "next/router";
import Link from "next/link";
import { useUser } from "../lib/hooks";
import Layout from "../components/Layout";
import { IBody } from "../types/ITemplates";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register: React.FC = () => {
  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  // call whenever user changes
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace("/dashboard");
  }, [user]);

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const body: IBody = {
      email: event.currentTarget.email.value,
      name: event.currentTarget.name.value,
      password: event.currentTarget.password.value,
      password2: event.currentTarget.password2.value,
    };
    const res: Response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      // writing our user object to the state
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const { name, email, password, password2 } = state;

  return (
    <Layout title="Register">
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <form onSubmit={handleSubmit}>
              {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  onChange={handleChange}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
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
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Create a password"
                  onChange={handleChange}
                  value={password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">password2</label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={password2}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </form>
            <p className="lead mt-4">
              Have An Account?
              <Link href="/login">
                <a>Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
