import React from "react";

import Button from "@components/base/Button";

const Index: React.FC<{}> = () => {
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
        <h2 className="text-xl">Your only limit is your imagination.</h2>
      </div>
      <div className="md:grid grid-cols-2 gap-4 mt-4">
        {images.map((img, index) => {
          return (
            <div
              className="border h-24 mt-4 md:mt-0"
              key={`${img.path}_${index}_indexImages`}
            >
              <img src={img.path} alt={`Image showing ${img.rawPrompt}`} />
              <p>{img.rawPrompt}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Index;
