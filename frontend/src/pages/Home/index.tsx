import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel';
import ChartView from 'components/ChartView';
import TableView from 'components/TableView';
import { getData, EmployeeData } from 'utils/Helper';

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  // Classes and value for toggle tab
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  // original data from the employee data set json file
  const [data, setData] = useState<EmployeeData[]>([]);
  // array for locations
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    getData(setData, setLocations);
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="View toggle tab">
          <Tab label="Chart" {...a11yProps(0)} />
          <Tab label="Table" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Chart View
        <ChartView data={data} locations={locations} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Table View
        <TableView data={data} locations={locations} />
      </TabPanel>
    </div>
  );
}
