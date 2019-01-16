import React from 'react';

import { Stage, Layer, Line } from 'react-konva'

export default () => {
  const width = window.innerWidth / 2
  const height = window.innerHeight / 2
  const gridGap = 25;
  const verticalArray = []
  for (let i = 0; i <= width; i += gridGap) {
    verticalArray.push(i);
  }
  const horizontalArray = []
  for (let i = 0; i <= height; i += gridGap) {
    horizontalArray.push(i);
  }

  return (

    <div className="grid">
      <Stage width={width} height={height}>
        <Layer>
          {verticalArray.map((x, i) => (
            <Line
              points={[x, 0, x, height]}
              stroke={'rgba(218, 223, 225, 1)'}
              strokeWidth={2}
              dash={[5, 5]}
              key={i}
            />
          ))}

          {horizontalArray.map((y, i) => (
            <Line
              points={[0, y, width, y]}
              stroke={'rgba(103, 128, 159, .6)'}
              strokeWidth={2}
              dash={[5, 5]}
              key={i}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

