import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface TabBarProps {
  value?: number;
  setValue: (value: number | ((prev: number) => number)) => void;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export default function TabBar(props: TabBarProps) {
  const { value = 0, setValue } = props;

  const onChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Tabs value={value} onChange={onChange} aria-label="View toggle tab">
        <Tab label="Chart" {...a11yProps(0)} />
        <Tab label="Table" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
  );
}
