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

  const style = {
    background: 'url("/static/img/bgs/cover.png") no-repeat 0 -200px',
    backgroundSize: 'cover',
}

  return (
    <div
      style={style}
      className="h-screen bg-black flex align-center place-content-center pt-16"
    >
      <div>
      <Button
        className="text-lg py-2 px-12 ring-4 ring-white/50"
        onClick={handleLogin}>
        Sign In
      </Button>
      </div>
    </div>
  );
};

export default Page;
