import React from 'react';
import Box from '@material-ui/core/Box';
import { EmployeeData } from 'utils/Helper';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export interface ViewProps {
  data: EmployeeData[];
  locations: string[];
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
