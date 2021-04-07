import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ViewProps } from 'components/TabPanel';

interface RowData {
  location: string;
  salary: string;
  delta: string;
}

export default function TableView(props: ViewProps) {
  const { data, locations } = props;
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    locations.forEach((location, index) => {
      const rows: RowData[] = new Array<RowData>();

      locations.forEach((location, index) => {
        rows.push({
          location,
          salary: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(data[index].currSalary),
          delta: new Intl.NumberFormat('en-US', {
            style: 'percent',
          }).format(
            (data[index].currSalary - data[index].prevSalary) /
              data[index].prevSalary,
          ),
        });
      });

      setRows(rows);
    });
  }, [data, locations]);

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Location</TableCell>
          <TableCell>Salary</TableCell>
          <TableCell>Delta</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row: RowData) => (
          <TableRow key={row.location}>
            <TableCell>{row.location}</TableCell>
            <TableCell>{row.salary}</TableCell>
            <TableCell>{row.delta}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
