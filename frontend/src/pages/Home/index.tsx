import { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TabBar from 'components/TabBar';
import TabPanel from 'components/TabPanel';
import ChartView from 'components/ChartView';
import TableView from 'components/TableView';
import { getData, EmployeeData } from 'utils/Helper';

interface HomeProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const HomePage = (props: HomeProps) => {
  // get the id of the home component
  const { id = 'home' } = props;
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

  return (
    <div className={classes.root} id={id}>
      <TabBar value={value} setValue={setValue} />
      <TabPanel value={value} index={0}>
        Chart View
        <ChartView data={data} locations={locations} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Table View
        <TableView
          data={[{ prevSalary: 100, currSalary: 120, employeeCount: 1 }]}
          locations={['US']}
        />
      </TabPanel>
    </div>
  );
};

export default HomePage;
