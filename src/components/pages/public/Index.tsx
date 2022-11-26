import React from "react";

import Button from "@components/base/Button";

const Index: React.FC<{}> = () => {
  //   const style = {
  //     background: 'url("/static/img/bgs/cover.png") no-repeat 0 -200px',
  //     backgroundSize: 'cover',
  // }

  const images = [{
    path: '/static/img/samples/yarniverse.png',
    rawPrompt: 'the universe spun in multicolor yarn, trending on artstation, by Pablo Picasso',
    subtitle: 'the universe spun in multicolor yarn, trending on artstation, by Pablo Picasso',
  },
  {
    path: '/static/img/samples/rollerblading_manhattan_bridge.png',
    rawPrompt: 'rollerblading across the manhattan bridge, by Pablo Picasso',
    subtitle: 'rollerblading across the manhattan bridge, by Pablo Picasso',
  },
  {
    path: '/static/img/samples/eiffel_picchu.png',
    rawPrompt: 'the eiffel tower on top of machu picchu, by Paul Klee',
    subtitle: 'the eiffel tower on top of machu picchu, by Paul Klee',
  },
  {
    path: '/static/img/samples/electric.png',
    rawPrompt: 'electricity flowing through highly detailed and complex brain synapses, trending on artstation',
    subtitle: 'electricity flowing through highly detailed and complex brain synapses, trending on artstation',
  },
  {
    path: '/static/img/samples/forest_trees.png',
    rawPrompt: 'the forest through the trees, by Walt Disney',
    subtitle: 'the forest through the trees, by Walt Disney',
  },
  {
    path: '/static/img/samples/sloth_in_paris.png',
    rawPrompt: 'a friendly three toed sloth, riding a bicycle through the cobblestone alleyways of Paris, by Wayne Thiebaud',
    subtitle: 'a friendly three toed sloth, riding a bicycle through the cobblestone alleyways of Paris, by Wayne Thiebaud',
  }]
  return (
    <div>
      <div className="md:grid grid-cols-2 gap-4 mt-8">
        {images.map((img, index) => {
          return (
            <div
              className="border mt-4 md:mt-0 px-4 py-8 bg-white rounded shadow-sm"
              key={`${img.path}_${index}_indexImages`}
            >
              <img
                src={img.path}
                alt={`Image showing ${img.rawPrompt}`}
                className="max-h-[400px] mx-auto rounded border-gray-500"
              />
              <p className="text-center mt-6 text-sm text-gray-600 max-w-sm mx-auto">{img.rawPrompt}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Index;
