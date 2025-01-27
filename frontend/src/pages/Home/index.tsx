import { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TabBar from 'components/TabBar';
import TabPanel from 'components/TabPanel';
import ChartView from 'components/ChartView';
import TableView from 'components/TableView';
import FilterBar from 'components/FilterBar';
import { loadData, EmployeeData } from 'utils/Helper';

interface HomeProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  body: {
    display: 'flex',
  },
  panel: {
    flex: 1,
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
  // array for location filter
  const [selections, setSelections] = useState<boolean[]>([]);
  // get location from the selections
  const filterLocations = (locations: string[]) =>
    locations.filter((value, index) => selections[index]);

  useEffect(() => {
    loadData(setData, setLocations, setSelections);
  }, []);

  return (
    <div className={classes.root} id={id}>
      <TabBar value={value} setValue={setValue} />
      <div className={classes.body}>
        <FilterBar
          locations={locations}
          selections={selections}
          setSelections={setSelections}
        />
        <div className={classes.panel}>
          <TabPanel value={value} index={0}>
            Chart View
            <ChartView data={data} locations={filterLocations(locations)} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Table View
            <TableView data={data} locations={filterLocations(locations)} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
