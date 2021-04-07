import React, { useState, useEffect } from 'react';
import { Line, Datum, Serie } from '@nivo/line';
import { EmployeeData } from 'utils/Helper';

interface ChartViewProps {
  data: EmployeeData[];
  locations: string[];
}

export default function ChartView(props: ChartViewProps) {
  const { data, locations } = props;
  const [serie, setSerie] = useState<Serie[]>([]);

  useEffect(() => {
    const datum = new Array<Datum>();

    locations.forEach((location, index) => {
      datum.push({
        x: location,
        y: data[index].currSalary,
        key: location,
      });
    });

    setSerie([
      {
        id: 'chart-view',
        data: datum,
        key: 'chart-view',
      },
    ]);
  }, [data, locations]);

  return (
    <>
      <Line
        data={serie}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        width={800}
        height={500}
      />
    </>
  );
}
