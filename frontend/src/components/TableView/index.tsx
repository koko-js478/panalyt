import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import numeral from 'numeral';
import { ViewProps } from 'components/TabPanel';
import { EmployeeData } from 'utils/Helper';

interface RowData {
  location: string;
  salary: string;
  delta: string;
}

export default function TableView(props: ViewProps) {
  const { data, locations } = props;
  const [rows, setRows] = useState<RowData[]>([]);
  const [total, setTotal] = useState<EmployeeData>();

  useEffect(() => {
    locations.forEach((location, index) => {
      const rows: RowData[] = new Array<RowData>();
      // total count and average salary
      let total: EmployeeData = {
        prevSalary: 0,
        currSalary: 0,
        employeeCount: 0,
      };

      locations.forEach((location, index) => {
        const { currSalary, prevSalary, employeeCount } = data[index];
        // push row for a table view
        rows.push({
          location,
          salary: numeral(currSalary).format('$0,0'),
          delta: numeral((currSalary - prevSalary) / prevSalary).format('+0%'),
        });
        // sum up prev and curr salary of employees
        total.prevSalary += prevSalary * employeeCount;
        total.currSalary += currSalary * employeeCount;
        total.employeeCount += employeeCount;
      });
      // get the average salary
      total.prevSalary /= total.employeeCount;
      total.currSalary /= total.employeeCount;

      setRows(rows);
      setTotal(total);
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

        {total && (
          <TableRow key={'Total'}>
            <TableCell>{'Total'}</TableCell>
            <TableCell>{numeral(total?.currSalary).format('$0,0')}</TableCell>
            <TableCell>
              {numeral(
                (total?.currSalary - total?.prevSalary) / total?.prevSalary,
              ).format('+0%')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
