import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "../lib/hooks";

interface Props {
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title = "nextjs_cln" }) => {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://bootswatch.com/4/flatly/bootstrap.min.css"
        />
      </Head>
      <header>
        <nav className="navbar navbar-inverse navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link href="/">
                <a className=".navbar-brand">
                  <h1>The Events Calendar</h1>
                </a>
              </Link>
            </div>
            <div className="nav navbar-nav navbar-right">
              {!user ? (
                <>
                  <Link href="../login">
                    <a className="btn btn-outline-success my-2 my-sm-0">
                      Login
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="btn btn-outline-success my-2 my-sm-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
