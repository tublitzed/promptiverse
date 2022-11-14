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

  const imgClassName = "border h-24 mt-4 md:mt-0";
  return (
    <div>
      <div className="my-4 text-center">
        <h2 className="text-xl">Main heading</h2>
      </div>
      <div className="md:grid grid-cols-2 gap-4 mt-4">
        <img src="static/img/1.png" alt="image 1" className={imgClassName} />
        <img src="static/img/2.png" alt="image 2" className={imgClassName} />
        <img src="static/img/3.png" alt="image 3" className={imgClassName} />
        <img src="static/img/4.png" alt="image 4" className={imgClassName} />
        <img src="static/img/5.png" alt="image 5" className={imgClassName} />
        <img src="static/img/6.png" alt="image 6" className={imgClassName} />
      </div>
    </div>
  );
};

export default Page;
