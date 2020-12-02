import React from "react";
import Link from "next/link";
import MyCalendar from "../components/MyCalendar";
import { useCurrentUser } from "../lib/hooks";
import Layout from "../components/Layout";

const Dashboard: React.FC = () => {
  const [user] = useCurrentUser();

  if (!user) {
    return (
      <Layout title="Dashboard">
        <div className="alert alert-light" role="alert">
          Please{" "}
          <Link href="/login">
            <a className="alert-link"> sign in</a>
          </Link>
        </div>
      </Layout>
    );
  }
  return (
    <Layout title="Dashboard">
      <MyCalendar user={user} />
    </Layout>
  );
};

export default Dashboard;
