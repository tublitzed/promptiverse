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

  const images = [{
    path: '/static/img/1.png',
    rawPrompt: 'foo',
    subtitle: 'todo',
  },
  {
    path: '/static/img/1.png',
    rawPrompt: 'foo',
    subtitle: 'todo',
  },
  {
    path: '/static/img/1.png',
    rawPrompt: 'foo',
    subtitle: 'todo',
  },
  {
    path: '/static/img/1.png',
    rawPrompt: 'foo',
    subtitle: 'todo',
  },
  {
    path: '/static/img/1.png',
    rawPrompt: 'foo',
    subtitle: 'todo',
  },
  {
    path: '/static/img/1.png',
    rawPrompt: 'foo',
    subtitle: 'todo',
  }]
  return (
    <div>
      <div className="my-4 text-center">
        <h2 className="text-xl">Main heading</h2>
      </div>
      <div className="md:grid grid-cols-2 gap-4 mt-4">
        {images.map((img) => {
          return (
            <div className="border h-24 mt-4 md:mt-0">
              <img src={img.path} alt={`Image showing ${img.rawPrompt}`} />
              <p>{img.rawPrompt}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Page;
