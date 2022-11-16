import React from "react";
import Layout from "@components/layouts/Layout";

const Page = () => {
  return (
    <Layout pageTitle="Sign Up">
      <div className="text-center py-12">
        <h2 className="text-2xl">
          Signups are currently closed to the public.
        </h2>
        <p>Stay tuned! We'll be opening up soon.</p>
      </div>
    </Layout>
  );
};

export default Page;
