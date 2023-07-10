import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select from '@mui/material/Select/Select';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import MenuItem from '@mui/material/MenuItem/MenuItem';

export const renderFromHelper = ({ touched, error }) => {
  if (touched && error) {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
  return;
};
export const renderTextField = ({
  label,
  input,
  outlineType,
  value,
  customError,

  meta: { touched, invalid, error, warning },
  ...custom
}) => {
  return (
    <div>
      <TextField
        style={{
          margin: '10px 0',
        }}
        variant='outlined'
        label={label}
        placeholder={label}
        error={(touched && invalid) || customError}
        helperText={(touched && error) || warning}
        {...input}
        {...custom}
      />
    </div>
  );
};

export const renderSelectField = ({
  input,
  fullWidth,
  variant,
  label,
  outlineType,
  style,
  meta: { touched, error },
  children,
  GenerateError,
  values,
  ...custom
}) => {
  return (
    <FormControl
      variant={variant}
      style={{
        margin: '10px 0',
      }}
      fullWidth={fullWidth}
      error={(touched && error) || GenerateError}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        {...input}
        {...custom}
        inputProps={{
          name: input.name,
        }}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>

      {input.name === 'gender' && renderFromHelper({ touched, error })}
    </FormControl>
  );
};
