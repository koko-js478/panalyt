import React, { useState, useEffect } from 'react';
import { Line, Datum, Serie } from '@nivo/line';
import { ViewProps } from 'components/TabPanel';

export default function ChartView(props: ViewProps) {
  const { data, locations } = props;
  const [serie, setSerie] = useState<Serie[]>([]);

  useEffect(() => {
    const datum: Datum[] = new Array<Datum>();
    // extract the data from the props
    locations.forEach((location, index) =>
      datum.push({
        x: location,
        y: data[index].currSalary,
        key: location,
      }),
    );
    // set serie to be displayed
    setSerie([
      {
        id: 'chart-view',
        data: datum,
        key: 'chart-view',
      },
    ]);
  }, [data, locations]);

  return (
    <Line
      data={serie}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      width={800}
      height={500}
    />
  );
}
