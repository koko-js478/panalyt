import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

interface FilterBarProps {
  locations: string[];
  selections: boolean[];
  setSelections: (value: boolean[] | ((prev: boolean[]) => boolean[])) => void;
}

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 0 0 30px',
  },
});

const FilterBar = (props: FilterBarProps) => {
  const { locations, selections, setSelections } = props;
  const classes = useStyles();
  // on change handler for the check box
  const onChange = (checked: boolean, index: number) => {
    setSelections((selections) => {
      selections[index] = checked;
      return [...selections];
    });
  };

  return (
    <div className={classes.list}>
      {locations.length > 0 &&
        selections.length > 0 &&
        locations.length === selections.length &&
        locations.map((location: string, index: number) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selections[index]}
                onChange={(event, checked) => onChange(checked, index)}
              />
            }
            label={location}
            key={location}
            id={location}
          />
        ))}
    </div>
  );
};

export default FilterBar;
