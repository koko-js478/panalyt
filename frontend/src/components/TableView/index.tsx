import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import numeral from 'numeral';
import { ViewProps } from 'components/TabPanel';
import { EmployeeData } from 'utils/Helper';
import { ClassNameMap } from '@material-ui/styles';

interface RowData {
  location: string;
  salary: string;
  delta: string;
  locationClass?: string;
  deltaClass: string;
}

const useStyles = makeStyles({
  root: {
    fontSize: '20px',
  },
  head: {
    background: '#49a299',
  },
  header: {
    color: 'white',
    width: '33.3%',
  },
  row: {
    borderBottom: '2px solid rgba(224, 224, 224, 1)',
  },
  delta: {
    display: 'inline-block',
    margin: '12px 0px',
    padding: '8px 50px',
    borderRadius: '30px',
  },
  plus: {
    background: '#bffb5b',
  },
  minus: {
    background: '#f3a83b',
  },
  zero: {
    background: '#fffd54',
  },
  total: {
    fontWeight: 'bold',
  },
});

// get the class name from delta value
const getDeltaClass = (deltaValue: number, classes: ClassNameMap): string =>
  `${classes.delta} ${
    deltaValue > 0
      ? classes.plus
      : deltaValue < 0
      ? classes.minus
      : classes.zero
  }`;

export default function TableView(props: ViewProps) {
  // get data and locations from props
  const { data, locations } = props;
  // row data
  const [rows, setRows] = useState<RowData[]>([]);
  // total data
  const classes = useStyles();

  useEffect(() => {
    const rows: RowData[] = new Array<RowData>();
    // total count and average salary
    let total: EmployeeData = {
      prevSalary: 0,
      currSalary: 0,
      employeeCount: 0,
    };

    locations.forEach((location, index) => {
      const { currSalary, prevSalary, employeeCount } = data[index];
      const deltaValue = (currSalary - prevSalary) / prevSalary;
      // push row for a table view
      rows.push({
        location,
        salary: numeral(currSalary).format('$0,0'),
        delta: numeral(deltaValue).format('+0%'),
        deltaClass: getDeltaClass(deltaValue, classes),
      });
      // sum up prev and curr salary of employees
      total.prevSalary += prevSalary * employeeCount;
      total.currSalary += currSalary * employeeCount;
      total.employeeCount += employeeCount;
    });
    // get the average salary
    total.prevSalary /= total.employeeCount;
    total.currSalary /= total.employeeCount;
    // get detal of the total salary
    const totalDelta = (total.currSalary - total.prevSalary) / total.prevSalary;
    // push total row
    rows.push({
      location: 'Total',
      salary: numeral(total.currSalary).format('$0,0'),
      delta: numeral(totalDelta).format('+0%'),
      locationClass: classes.total,
      deltaClass: getDeltaClass(totalDelta, classes),
    });

    setRows(rows);
  }, [data, locations, classes]);

  return (
    <Table aria-label="simple table" className={classes.root}>
      <TableHead className={classes.head}>
        <TableRow>
          <TableCell align="center" className={classes.header}>
            Location
          </TableCell>
          <TableCell align="center" className={classes.header}>
            Salary
          </TableCell>
          <TableCell align="center" className={classes.header} size="small">
            Delta
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row: RowData) => (
          <TableRow key={row.location} className={classes.row}>
            <TableCell align="center" className={row.locationClass}>
              {row.location}
            </TableCell>
            <TableCell align="center">{row.salary}</TableCell>
            <TableCell align="center" className={row.deltaClass}>
              {row.delta}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
