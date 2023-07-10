export const adminDetails = {
  username: 'admin@mui.com',
  password: 'password#1234',
};

export const getAllEmployees = JSON.parse(
  localStorage.getItem('getAllEmployees')
    ? localStorage.getItem('getAllEmployees')
    : JSON.stringify([])
);

export const employeeTableHeadings = [
  {
    id: 'id',
    label: 'Id',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'gender',
    label: 'Gender',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

export const gender = [
  {
    id: 'male',
    label: 'Male',
  },
  {
    id: 'female',
    label: 'Female',
  },
  {
    id: 'others',
    label: 'Others',
  },
];
