import React from "react";
import Link from "next/link";
import { useCurrentUser } from "../lib/hooks";
import Layout from "../components/Layout";

const Welcome: React.FC = () => {
  const [user] = useCurrentUser();

  if (user) {
    return (
      <Layout title="Home Page">
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body text-center">
              <img
                src="https://avatarfiles.alphacoders.com/998/99820.gif"
                alt="Moon"
              />
              <p>
                I am Sailor Moon, champion of justice! On behalf of the moon, I
                will right wrongs and triumph over evil, and that means you! -
                Sailor Moon
              </p>
              <Link href="/dashboard">
                <a className="btn btn-primary btn-block mb-2">Dashboard</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout title="Home Page">
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body text-center">
            <img
              src="https://avatarfiles.alphacoders.com/998/99820.gif"
              alt="<Moon"
            />
            <p>Create an account or login</p>
            <Link href="/login">
              <a className="btn btn-primary btn-block mb-2">Login</a>
            </Link>
            <Link href="/register">
              <a className="btn btn-secondary btn-block">Register</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
