import React from 'react';
import { Line } from '@nivo/line';

const data = [
  {
    data: [
      {
        x: 'plane',
        y: 53,
      },
      {
        x: 'helicopter',
        y: 277,
      },
      {
        x: 'boat',
        y: 248,
      },
      {
        x: 'train',
        y: 54,
      },
      {
        x: 'subway',
        y: 166,
      },
      {
        x: 'bus',
        y: 181,
      },
    ],
  },
];

export default function ChartView() {
  return (
    <>
      <Line
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        width={800}
        height={500}
      />
    </>
  );
}
