import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@components/base/Button";
const Page: React.FC<{}> = () => {
  const { loginWithRedirect, user } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: "/",
      },
    });
  };

//   const style = {
//     background: 'url("/static/img/bgs/cover.png") no-repeat 0 -200px',
//     backgroundSize: 'cover',
// }

  return (
    <div>
      <div className="-mx-4 bg-red-800 h-96 text-center">
        (Hero here)
      </div>
      <p className="mt-4">
        And some other stuff here
      </p>
    </div>
  );
};

export default Page;
