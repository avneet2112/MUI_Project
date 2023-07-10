import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Field, Form, reduxForm } from 'redux-form';
import { renderSelectField, renderTextField } from '../reduxFormComponents';
import { connect, useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { gender, getAllEmployees } from '../../constants';
import { setFormDataReducer } from '../../redux/action';
import { isContact, isEmail, isName } from '../../constants/validations';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Country, State, City } from 'country-state-city';
import CloseConfirmationModal from './closeConfirmationModal';
const validate = (values) => {
  let errors = [];
  let requiredFields = [
    'id',
    'name',
    'email',
    'gender',
    'contact',
    'address_line_1',
    'country',
  ];
  if (values.name && !isName(values.name)) {
    errors['name'] = 'Please enter a valid name';
  }
  if (values.email && !isEmail(values.email)) {
    errors['email'] = 'Please enter the valid email id';
  }
  console.log(values);
  if (values.contact && !isContact(values.contact)) {
    errors['contact'] = 'Please enter a valid phone No';
  }
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  console.log(errors);
  return errors;
};
const EmployeeForm = (props) => {
  const { onClose, isEdit, dataKey, pristine, submitting, invalid } = props;
  const formValues = useSelector((state) => state.form);
  const [genderList, setGenderList] = useState([]);
  const [countries, setAllCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [closeConfirmation, setcloseConfirmation] = useState(false);

  const dispatch = useDispatch();
  function handleAdd(e) {
    e.preventDefault();
    let employees = getAllEmployees;
    employees.push(formValues.employeeForm.values);
    localStorage.setItem('getAllEmployees', JSON.stringify(employees));
    onClose();
  }

  function handleEdit(e) {
    let editDetails = [...getAllEmployees];
    editDetails.forEach((element, ind) => {
      if (ind === dataKey) {
        Object.keys(formValues.employeeForm.values).forEach((key, value) => {
          element[key] = formValues.employeeForm.values[key];
        });
      }
    });
    localStorage.setItem('getAllEmployees', JSON.stringify(editDetails));
    onClose();
  }

  function handleResponse(userResponse) {
    setcloseConfirmation(false);
    if (userResponse) {
      onClose();
    }
  }
  useEffect(() => {
    if (isEdit) {
      const employeeD = getAllEmployees?.find((res, ind) => ind === dataKey);
      dispatch(setFormDataReducer(employeeD));
    } else {
      dispatch(setFormDataReducer(''));
    }
    setGenderList(gender.map((res) => res.label));
    setAllCountries(Country.getAllCountries().map((res) => res.name));
  }, []);

  useEffect(() => {
    let countryIsoCode = Country.getAllCountries().filter(
      (res) => res.name === formValues.employeeForm.values.country
    )[0]?.isoCode;

    if (formValues.employeeForm?.values?.country) {
      setStates(
        State.getStatesOfCountry(countryIsoCode).map((res) => res.name)
      );
    }
  }, [formValues.employeeForm?.values?.country]);

  useEffect(() => {
    if (
      formValues.employeeForm?.values?.country &&
      formValues.employeeForm?.values?.state
    ) {
      let countryIsoCode = Country.getAllCountries().filter(
        (res) => res.name == formValues.employeeForm.values.country
      )[0]?.isoCode;

      let states = State.getStatesOfCountry(countryIsoCode);

      let stateIsoCode = states.filter(
        (res) => res.name == formValues.employeeForm?.values?.state
      )[0]?.isoCode;

      setCities(
        City.getCitiesOfState(countryIsoCode, stateIsoCode).map(
          (res) => res.name
        )
      );
    }
  }, [formValues.employeeForm?.values?.state]);
  return (
    <>
      {/* {console.log(countries)} */}
      {closeConfirmation && (
        <CloseConfirmationModal handleResponse={handleResponse} />
      )}
      <Dialog
        onClose={() => {
          pristine ? onClose() : setcloseConfirmation(true);
        }}
        open={true}
        fullWidth
      >
        <DialogTitle>Employee Form</DialogTitle>
        <Box sx={{ padding: '10px' }}>
          <Form onSubmit={isEdit ? handleEdit : handleAdd}>
            <Grid container>
              <Grid item sm={12}>
                <Field
                  fullWidth={true}
                  component={renderTextField}
                  name='id'
                  label='Id*'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Field
                  fullWidth={true}
                  component={renderTextField}
                  name='name'
                  label='Name*'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  style={{ margin: '10px 0px' }}
                  fullWidth={true}
                  name='gender'
                  component={renderSelectField}
                  values={genderList || []}
                  label='Gender*'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Field
                  fullWidth={true}
                  component={renderTextField}
                  name='email'
                  values={genderList || []}
                  label='Email*'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  fullWidth={true}
                  component={renderTextField}
                  name='contact'
                  label='Contact*'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Field
                  fullWidth={true}
                  component={renderTextField}
                  name='address_line_1'
                  label='Addres Line 1*'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  fullWidth={true}
                  component={renderTextField}
                  name='address_line_2'
                  label='Addres Line 2'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={12}>
                <Field
                  fullWidth={true}
                  component={renderSelectField}
                  name='country'
                  values={countries || ''}
                  label='Country*'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Field
                  fullWidth={true}
                  component={renderSelectField}
                  name='state'
                  values={states || ''}
                  label='States'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  fullWidth={true}
                  component={renderSelectField}
                  name='city'
                  values={cities || ''}
                  label='City'
                  InputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </Grid>
            </Grid>

            <Button
              disabled={pristine || submitting || invalid}
              type='submit'
              variant='contained'
              fullWidth
            >
              {isEdit ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Box>
      </Dialog>
    </>
  );
};
const mapStateToProps = (state) => ({
  details: state.details,
  initialValues: state.details,
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'employeeForm',
    validate: validate,
    destroyOnUnmount: false,
    enableReinitialize: true,
  })(EmployeeForm)
);
