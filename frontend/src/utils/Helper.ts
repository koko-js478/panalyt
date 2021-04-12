interface Employee {
  firstName: string;
  lastName: string;
  location: string;
  prevSalary: string;
  currSalary: string;
  org: string;
}

export interface EmployeeData {
  prevSalary: number;
  currSalary: number;
  employeeCount: number;
}

// load the data from json file
export const loadData = (
  setData: (
    value: EmployeeData[] | ((prev: EmployeeData[]) => EmployeeData[]),
  ) => void,
  setLocations: (value: string[] | ((prev: string[]) => string[])) => void,
  setSelections: (value: boolean[] | ((prev: boolean[]) => boolean[])) => void,
) => {
  fetch('EmployeeDataset.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((originalData: Employee[]) => {
      // data that will be used for chart components
      const data = new Array<EmployeeData>();
      // different locations from the original data
      const locations = new Array<string>();

      originalData.forEach((value: Employee) => {
        // get information from the original data
        const { location } = value;
        const prevSalary = parseFloat(value.prevSalary.substr(1));
        const currSalary = parseFloat(value.currSalary.substr(1));

        // check if the location already exists
        const position = locations.indexOf(location);

        if (position === -1) {
          locations.push(location);

          data.push({
            prevSalary,
            currSalary,
            employeeCount: 1,
          });
        } else {
          const { employeeCount } = data[position];

          data[position].prevSalary =
            (data[position].prevSalary * employeeCount + prevSalary) /
            (employeeCount + 1);

          data[position].currSalary =
            (data[position].currSalary * employeeCount + currSalary) /
            (employeeCount + 1);

          data[position].employeeCount++;
        }
      });

      setData(data);
      setLocations(locations);
      setSelections(new Array<boolean>(locations.length).fill(true));
    });
};
